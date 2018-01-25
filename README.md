## Liquid Playground [WIP]

This tiny app is intended to solve a common problem when working with the Liquid template language and that's testing the result of running syntax on custom data. For example, let's say you're building a template or writing an email that relies on liquid to pull custom data for particular email subscribers or some other source. It would be nice to see how your liquid syntax renders for specific use cases. This app helps to solve that.

You can find the general liquid reference [here](http://shopify.github.io/liquid/basics/introduction/).

### Todo
- Setup linting
- Better error handling and feedback
- Handle tag arrays appropriately
- Create and register Drip specific filters
- Allow users to select from premade Liquid recipes
- Error handling for blank custom field creation

### Preloaded liquid object and values

The app is loaded with a small object with some default values. 

```json
"subscriber": {
  "first_name": "Drippy",
  "last_name": "Dropperson",
  "full_name": "Drippy Dropperson",
  "signup_date": "Thu, 30 Nov 2017 19:22:11 UTC +00:00",
  "address": "123 Dripsters Lane, Minneapolis MN 55145",
  "skus": "prod123, sku567, item345",
  "order_total": "100.49"
}

```