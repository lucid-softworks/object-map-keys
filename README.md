# `@lucid-softworks/object-map-keys`

Transform own enumerable string and symbol keys with full callback context.
When transformed keys collide, the later property wins.

```ts
import { mapKeys } from "@lucid-softworks/object-map-keys";

mapKeys({ firstName: "Ada" }, (_, key) => key.toUpperCase());
```
