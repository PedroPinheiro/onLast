# onLast
Ensure a event handler to be the last to fire.

## Usage

In this simple example, **onLast** is called before **on**" but its handler will be the last to be fired.

```js
$('body')
	.onLast('click', function() { console.log("last!") })
	.on('click', function() { console.log("first!") });

```
