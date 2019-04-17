---
template: post
title: Destructuring the Fundamentals of React Hooks
date: 2019-04-17T22:37:10.230Z
category: coding
---
Hooks have become a pretty powerful new feature of React, but they can be intimidating if you’re not really sure what’s going on behind the scenes. The beauty is now being able to manage state in a simple (and reusable) manner within function components.

But why not just use a class? Without getting too far away from the topic, functions provide a more straightforward way to write your components, guiding you to write in a cleaner and more reusable way. Bonus: it typically makes writing tests easier.

There’s [a lot of use cases for hooks](https://github.com/rehooks/awesome-react-hooks), so I won’t dive into examples, but it shouldn't be too bad to get up to speed with a few quick lines.

## Diving in to the cookie jar
Here we have `MyCookies`, a function component, which we can consider our cookie jar. Let's say we want to internally keep track of how many cookies we have in the jar. With the new hooks API, we can add a simple line using `useState` to handle the job.

```
const MyCookies = () => {
  const [ cookies, setCookieCount ] = useState(0);
  ...
};
```



## Wait, how do we get cookies out of that?
If you think the above is magic and are wondering how the values in the array are getting set, you’ll need to understand the basics of array destructuring.

While destructuring an object will use the same key wherever you try to pull it from, arrays destructure using the order of the items within the array.

```
const [ one, two ] = [ 1, 2 ];
console.log(one); // 1
console.log(two); // 2
``` 

While the above seems like it’s naming them in a particular order, it’s not as shown below:

```
const [ two, one ] = [ 1, 2 ];
console.log(two); // 1
console.log(one); // 2
```

Without going too far down the technical rabbit hole, `useState` is a function that returns an array that we’re destructuring for use within our component. 

What about the 0 inside the invocation of `useState` itself? That’s simply the initial value we’re setting the state instance to, so in this case, we’ll sadly start off with 0 cookies.

## Actually use state
Once we have our destructured `cookies` and the `setCookiesCount` function,  we can start interacting with the component’s local state like you might do using `setState` within a class component.

At render time, our `cookies` value will be that invocation of `useState`’s internal state value, similar to what you might see with `this.state`. To update that value, we can simply call `setCookiesCount` .

```
const MyCookies = () => {
  const [ cookies, setCookieCount ] = useState(0);
  return (
    <>
      <h2>Cookies: { cookies }</h2>
      <button onClick={() => setCookieCount(cookies + 1)} >
        Add Cookie
      </button>
    </>
  );
};
```

If you’re more used to the class syntax, you might update state using `this.setState` looking something like this:
```
class MyCookies extends React.Component {
  constructor() {
    super();
    this.state = {
      cookies: 0
    }
  }
  render() {
    return (
      <>
        <h2>Cookies: { this.state.cookies }</h2>
        <button onClick={() => this.setState({cookies: this.state.cookies + 1})}>
          Add cookie
        </button>
      </>
    )
  }
}

```

## How to use effects
Often components need a way to create side effects that won’t necessarily interrupt the functional flow of a function component. Say we have the number of cookies we have saved on a server somewhere, we might want to fetch that count when the app loads.

```
const MyCookies = () => {
  const [ cookies, setCookieCount ] = useState(0);
	useEffect(() => {
    getCookieCount().then((count) => {
      setCookieCount(count);
    })
  });
  ...
};
```

After the component renders, everything inside of `useEffect` will run, meaning any side effects originating from `useEffect` will only occur after the render is complete. That said, once `useEffect` does run, we fire `getCookieCount` and use our previous `setCookieCount` function to update the state of the component.

## Hold up, there's something wrong...
There’s a gotcha in the code above though. That effect will run every time, essentially wiping out any new increments to our cookie value from our original Add Cookie button.

To get around this, we can set a 2nd argument to the `useEffect` function that allows us to let React know when to run it again. In our example above, setting that 2nd argument to an empty array will make it run only once.

```
const MyCookies = () => {
  const [ cookies, setCookieCount ] = useState(0);
	useEffect(() => {
    getCookieCount().then((count) => {
      setCookieCount(count);
    })
  }, []);
  ...
};
```

In most cases though, you’ll want to pass an array of dependencies that when changed, will cause `useEffect` to fire again. Say for example, you’re fetching the count of a specific cookie type and want to get the count again if that type changes.

```
const MyCookies = ({cookieType = 'chocolate'}) => {
  const [ cookies, setCookieCount ] = useState(0);
	useEffect(() => {
    getCookieCount().then((count) => {
      setCookieCount(count);
    })
  }, [ cookieType ]);
  ...
};
```

In the above code, any time our prop `cookieType` changes, React knows that we depend on it for our effect, and will rerun that effect.

## Trying to make use of context
I’m not going to [go into the details of React’s context API](https://reactjs.org/docs/context.html) as that’s a little out of scope. However, if you’re familiar with it, the `useContext` hook let’s you easily make use of your context from within your function component.

```
import BasketContext from 'context';

const Basket = ({children}) => {
  return (
    <BasketContext.Provider value={basketItems}>
      <h1>My Basket</h1>
      { children }
    </BasketContext.Provider>
  );
}

// MyCookies.js
const MyCookies = ({cookieType = 'chocolate'}) => {
  const basketItems = useContext(BasketContext);
  ...
};
```

In the above code, given our already created context, we can immediately “use” said context and collect the values passed in to our context provider.

## Cleaning your hooks
What makes hooks even more powerful is combining and abstracting them DRYing up your code in a cleaner way. As a quick last example, we can take our cookie examples of `useState` and `useEffect` and abstract them into their own `use[Name]` function, effectively [creating a custom hook](https://reactjs.org/docs/hooks-custom.html).

```
// useCookies.js
function useCookies(initialCookieCount) {

  const [ cookies, setCookieCount ] = useState(initialCookieCount);

	useEffect(() => {
    getCookieCount().then((count) => {
      setCookieCount(count);
    })
  }, []);

  function addCookie() {
    setCookieCount(cookies + 1);
    console.log('😍');
  }

  function removeCookie() {
    setCookieCount(cookies - 1);
    console.log('😭');
  }

  return {
    cookies,
    addCookie,
    removeCookie
  }
};

// MyCookies.js
const MyCookies = () => {
  const { cookies, addCookie, removeCookie } = useCookies(0);
  ...
};
```

We were safely able to abstract our state logic and still utilize it to manage our cookies.

## Plenty more to get hooked on
These are the basic 3 hooks React gives us, but [there are many more they provide out of the box](https://reactjs.org/docs/hooks-reference.html), all with the same underlying principles that the React documentation does a good job at explaining.
