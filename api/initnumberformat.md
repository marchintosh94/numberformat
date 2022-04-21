---
description: Initialize globally number format options
---

# initNumberFormat



```typescript
import { initNumberFormat, NumberFormatOptions } from "@marchintosh94/number-format"

const config: NumberFormatOptions = {
  defaultDecimals: 2,
  defaultErrorValue: 0,
  delimitersChar: {
    decimal: '.',
    thousands: ','
  },
  defaultCurrecySymbol: {
    code: 'USD',
    sign: '$'
  }
}

initNumberFormat(config)

```

### NumberFormatOptions

<table><thead><tr><th>Property</th><th>Description</th><th align="center">Default</th><th data-type="checkbox">Required</th></tr></thead><tbody><tr><td>defaultDecimals</td><td>Default number of decimals when you formatting a number  without specifing number of decimals.</td><td align="center">2</td><td>false</td></tr><tr><td>delimitersChar</td><td>Thousands and decimal number char separator.</td><td align="center"><pre class="language-typescript"><code class="lang-typescript">  delimitersChar: {
    decimal: ',',
    thousands: '.'
  }</code></pre></td><td>true</td></tr><tr><td>defaultErrorValue</td><td>number returned in cas of error when format functions are running</td><td align="center">0</td><td>false</td></tr><tr><td>defaultCurrecySymbol</td><td>Default currency symbol and relative code. It is used to format number as currency</td><td align="center"><pre><code>  defaultCurrecySymbol: {
    code: '',
    sign: ''
  }</code></pre></td><td>false</td></tr></tbody></table>

