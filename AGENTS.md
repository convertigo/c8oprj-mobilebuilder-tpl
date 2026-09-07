# Mobile Builder template

## Template releases

- Every user-visible template change must increment the patch number in both `c8oProject.yaml` and `ionicTpl/version.json`. These versions must always be identical.
- Do not change `standalone` or `nodeJsVersion` in `ionicTpl/version.json` unless the change explicitly requires it.

## Generated application behavior

- Keep action-bean implementations compatible with all supported Convertigo 8.4.x engines. Do not add an Engine Java dependency for a template-only fix unless it is strictly necessary.
- Prefer Ionic public APIs when generating runtime behavior. For overlay components, set creation-time options when Ionic does not support mutating them after initialization.

## Validation

- Validate edited JSON metadata with `JSON.parse`.
- Run `npm run build` from `ionicTpl` when dependencies are installed; otherwise report that the build could not be run rather than installing dependencies implicitly.
