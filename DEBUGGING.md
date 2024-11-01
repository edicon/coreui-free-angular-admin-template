# Debugging

## Error TS2430

```error
✘ [ERROR] TS2430: Interface 'DatabaseSnapshotDoesNotExist<T>' incorrectly extends interface 'DataSnapshot'.
  Types of property 'forEach' are incompatible.
    Type '(action: (a: DatabaseSnapshot<T>) => boolean) => boolean' is not assignable to type '(action: (a: Ite
```

- [Interface 'DatabaseSnapshotExists<T>' incorrectly extends interface 'DataSnapshot'](https://github.com/angular/angularfire/issues/3255)
  - tsconfig.json:
    `"skipLibCheck": true`
