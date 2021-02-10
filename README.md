# Custom Hooks Dos & Dont's

This project shows some examples, how mistakes with object references in custom hooks could look like and serveral ways how to prevent it.

```
yarn test
```

# Referencial equality in custom hooks

In general you could say: If possible, only use primitive types in a dependency array of a react hook. If you have to deal with objects in as a dependency, be aware of object equality to prevent unnecessary hook calls and maybe rerenderings which could effect the performance of your app.

## Primitve Types

Returning primitive types in a custom hook should never be a problem:

```ts
// no problems with this:
export const useNumber = () => 42;
```

More examples in `src/simple/primitives.ts`

## Global Objects

**good**

```tsx
const object = { hello: "world" };
export const useGlobalObject = () => object;

const ExampleApp = () => {
  const res = useGlobalObject();
  useEffect(() => {
    // this effect will only be triggerd once even on rerender
    // because the reference of "res" will not change
  }, [res]);
  return <p>hello world</p>;
};
```

More examples in `src/simple/globalObjects.ts`

**bad**

```tsx
export const useGlobalObject = () => ({ hello: "world" });

const ExampleApp = () => {
  const res = useGlobalObject();
  useEffect(() => {
    // this effect will always be triggered
    // because the reference of "res" will change every time it rerenderes
  }, [res]);
  return <p>hello world</p>;
};
```

## Non-global Objects

In most cases you have to handle with objects in the scope of your custom hook and don't use global objects. In these cases you can use `useMemo`, `useRef` or `useState` to make sure that the reference of your returned object does not change unnecessarily. Which of those three hooks you choose depends on the use case.

### useMemo

`useMemo` also has a dependency array. For this reason you have to ensure to work either with primitives or that references in this dependency array don't change unncessesarily:

**good for primitive dependencies**

```tsx
// primitive dependencies
export const useCustom = (val: string) => {
  const memorizedObject = useMemo(() => ({ hello: val }), [val]); // no problem, because val is a primitive value
  return memorizedObject;
};
```

**tricky for object dependencies**

```tsx
// object dependencies
export const useCustom = () => {
  const dependencyObject = useDep();
  // In this case, when you want to use useMemo,
  //   you have to ensure that useDep
  //   returns an object which reference doesn't change
  //   every time when the hook useCustom is rerenderd.
  // If you don't do that, useMemo would always return
  //   an object with a new reference
  const memorizedObject = useMemo(() => ({ hello: dependencyObject.val }), [
    dependencyObject,
  ]);
  return memorizedObject;
};
```

Therefore i would recommend to use `useRef` with `dequal` for such cases (next expamle).

More examples for `useMemo` in `src/non-global-objects/primitive-hook-args/useMemo.ts` & `src/non-global-objects/object-hook-args/useMemo.ts`

### useRef

**good for object dependencies**

```tsx
// object dependencies
export const useCustom = () => {
  const dependencyObject = useDep();
  const memorizedObjectRef = useRef(dependencyObject);

  if (!dequal(memorizedObjectRef.current, dependencyObject)) {
    memorizedObjectRef.current = dependencyObject;
  }

  return memorizedObject;
};
```

In this example we use [dequal](https://github.com/lukeed/dequal) for deep comparison of the memorized object and the dependency object.

More examples for `useRef` in `src/non-global-objects/primitive-hook-args/useRef.ts` and `src/non-global-objects/object-hook-args/useRef.ts`

### useState

`useState` is another way to reach object reference equality for your custom hook. The "downside" of `useState` in this case is, that it triggeres an additional rerendering. This is expected and not bad per se, but in some cases you possibly want to prevent an unnecessary rendering step.

With `useState` you also have to ensure Object Equality in case of Object dependencies with `useDeepCompareEffect` (`src/non-global-objects/object-hook-args/useState.ts`). In case of primitive dependencies you can use the normal `useEffect` hook `src/non-global-objects/primitive-hook-args/useState.ts`.

## Redux

**default objects of selectors**

```ts
// If you want to define default values in redux selectors,
//  which are not simple data types, use global variables.
// Don't define non simple data types inline as default values.
const defaultValue = { count: 0 };
export const useCustom = () => {
  return useSelector<ReturnType<typeof rootReducer>>(
    (state) => state.counter?.value1 ?? defaultValue
  );
};
```

**computed objects in selectors**

```ts
// If you want to filter a list in a redux selector use useRef and dequal (npm package).
// Don't return the plain filtered value.
export const useCustom = () => {
  const filteredState = useSelector<ReturnType<typeof rootReducer>>((state) =>
    state.list.filter((_, i) => i % 2 === 0)
  );
  const filteredRef = useRef(filteredState);
  if (!dequal(filteredState, filteredRef.current)) {
    filteredRef.current = filteredState;
  }
  return filteredRef.current;
};
```

## Component state

```tsx
// Compare state objects if they could be equal to the current state.
//  Setting primitives is harmless (shallow compare)
// Prevent unnecessary rerenderings by setting equal objects without comparing before.
const TestComponentSolution = () => {
  const [count, setCount] = useState({ num: 0 });
  const [prim, setPrim] = useState("hello world");
  rendered();
  return (
    <>
      <div
        onClick={() => {
          const newCount = { num: count.num }; // always equal
          if (!dequal(newCount, count)) {
            // never will be true
            // so it will not rerender
            setCount(newCount);
          }
        }}
      />
      <div onClick={() => setCount({ num: count.num + 1 })} />
      <div
        onClick={() => {
          // harmless because of shallow compare
          setPrim("hello world");
        }}
      />
    </>
  );
};
```

## Rerenderings

```tsx
// Make small components to prevent unnecessary rerenderings!!
const Child = () => {
  const [_, setState] = useState({});
  return <div data-testid="setChildState" onClick={() => setState({})} />;
};

const Parent = () => {
  const [_, setState] = useState({});
  return (
    <>
      <Child />
      <div onClick={() => setState({})} />
    </>
  );
};
```
