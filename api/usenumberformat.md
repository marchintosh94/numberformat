---
description: Hook to format numbers
---

# useNumberFormat

This hook contains and returns all methods  and properties to be used  to get formatted number. It accepts a value as param, that will be used as number to be formatted. The param could be a string, a number or undefined.

#### Example:

```typescript
useNumberFormat()
// or
useNumberFormat('22,12')
// or 
useNumberFormat(12)
```

{% hint style="info" %}
Using destructoring on this hook you can access directly all methdods and properties contained in itself

```typescript
const {
    format,
    setCurrencySymbol,
    setNumber,
    formatCurrency,
    config
} = useNumberFormat()
```
{% endhint %}

