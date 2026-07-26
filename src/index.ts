export type KeyMapper<TObject extends object, TKey extends PropertyKey> = (
  value: TObject[keyof TObject],
  key: keyof TObject,
  object: TObject,
) => TKey;

/** Transform own enumerable keys; later collisions overwrite earlier values. */
export function mapKeys<TObject extends object, TKey extends PropertyKey>(
  object: TObject,
  transform: KeyMapper<TObject, TKey>,
): Record<TKey, TObject[keyof TObject]> {
  const entries = Reflect.ownKeys(object)
    .filter((key) => Object.prototype.propertyIsEnumerable.call(object, key))
    .map((key) => [
      transform(object[key as keyof TObject], key as keyof TObject, object),
      object[key as keyof TObject],
    ]);

  return Object.fromEntries(entries) as Record<TKey, TObject[keyof TObject]>;
}
