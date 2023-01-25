# gyugyu/scrape-html-action

GitHub action that fetch HTML from the specific URL and parse it.

## Usage:

See [action.yml](action.yml)

### Basic

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: gyugyu/scrape-html-action@v1
    with:
      url: http://example.com
      selector: div
      destination: out.html
```
