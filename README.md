# Flash-Message

Angular Module for flash messages. 

## Usage

In your template

```
<flash-message data-template-url="custom-path/flash.html"></flash-message>
```

In your code

```javascript
FlashMessage.warning('Be warned');
```

## Development

- `make install` to setup
- `make ci` to run linter and tests
- `make release` to update dist files

## Dependencies

- angular [https://github.com/angular]
- angular-translate [https://github.com/angular-translate/angular-translate]
