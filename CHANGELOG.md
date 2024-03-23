# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.9.1](https://github.com/AlexAegis/common/compare/v0.9.0...v0.9.1) (2024-03-23)


### Bug Fixes

* case conversion with empty strings ([589e2c9](https://github.com/AlexAegis/common/commit/589e2c9207d95ee807660c196f316904ef273162))

## [0.9.0](https://github.com/AlexAegis/common/compare/v0.8.2...v0.9.0) (2024-03-22)

## [0.8.2](https://github.com/AlexAegis/common/compare/v0.8.1...v0.8.2) (2023-12-28)


### Features

* allow setting the cache through options ([7e018a3](https://github.com/AlexAegis/common/commit/7e018a3c64c3c7871c38bb19b634d2ec21482f7c))


### Bug Fixes

* memoize fn ([7050662](https://github.com/AlexAegis/common/commit/70506620a8c7a6c31f24648f1755ef7828461da7))

## [0.8.1](https://github.com/AlexAegis/common/compare/v0.8.0...v0.8.1) (2023-12-14)


### Bug Fixes

* getPrettierFormatter now can find the prettier config again ([4897ace](https://github.com/AlexAegis/common/commit/4897acebbc2af362d0ba97f46b6608f7a2d8628b))

## [0.8.0](https://github.com/AlexAegis/common/compare/v0.7.3...v0.8.0) (2023-11-30)

## [0.7.3](https://github.com/AlexAegis/common/compare/v0.7.2...v0.7.3) (2023-11-16)

## [0.7.2](https://github.com/AlexAegis/common/compare/v0.7.1...v0.7.2) (2023-11-13)

## [0.7.1](https://github.com/AlexAegis/common/compare/v0.7.0...v0.7.1) (2023-10-09)

## [0.7.0](https://github.com/AlexAegis/common/compare/v0.6.2...v0.7.0) (2023-09-01)

## [0.6.2](https://github.com/AlexAegis/common/compare/v0.6.1...v0.6.2) (2023-08-19)


### Features

* **common:** added bufferedAllSettled ([2f7ea87](https://github.com/AlexAegis/common/commit/2f7ea87e9334c13120b7176ce462af24c8cbfb01))

## [0.6.1](https://github.com/AlexAegis/common/compare/v0.6.0...v0.6.1) (2023-08-02)

## [0.6.0](https://github.com/AlexAegis/common/compare/v0.5.2...v0.6.0) (2023-08-02)


### ⚠ BREAKING CHANGES

* **workspace-tools:** getWorkspaceRoot and getCurrentPackageRoot now using an options param

### Features

* **workspace-tools:** added ignorefile reading ([cee2fb2](https://github.com/AlexAegis/common/commit/cee2fb217ebb80c6ee649d231a0dc12656524afc))
* **workspace-tools:** getWorkspaceRoot and getCurrentPackageRoot now using an options param ([f8609b5](https://github.com/AlexAegis/common/commit/f8609b5b320e7aea00bdd2e09318ab1d8f223a4f))

## [0.5.2](https://github.com/AlexAegis/common/compare/v0.5.1...v0.5.2) (2023-08-01)


### Bug Fixes

* random fn ([65ee089](https://github.com/AlexAegis/common/commit/65ee08931b1f5cf99f8dad28b069488efc754143))

## [0.5.1](https://github.com/AlexAegis/common/compare/v0.5.0...v0.5.1) (2023-07-25)


### Features

* **common:** add string case converters and array shuffler ([4625779](https://github.com/AlexAegis/common/commit/4625779728a03d5f43564ee0c7feba1e8c081814))

## [0.5.0](https://github.com/AlexAegis/common/compare/v0.4.5...v0.5.0) (2023-07-21)


### Features

* **common:** deepMapObject can now drop values ([e584a13](https://github.com/AlexAegis/common/commit/e584a13cfdf300026dd1f683bd491778b08f5082))

## [0.4.5](https://github.com/AlexAegis/common/compare/v0.4.4...v0.4.5) (2023-07-18)


### Features

* **common:** added valueOf type and someDefined ([8811ae1](https://github.com/AlexAegis/common/commit/8811ae14a5dc9a32b1d8158cc02b7d6b6d6d5f56))

## [0.4.3](https://github.com/AlexAegis/common/compare/v0.4.2...v0.4.3) (2023-07-08)


### Features

* **workspace-tools:** normalize sorting preference and support sort.json files ([87f87f7](https://github.com/AlexAegis/common/commit/87f87f70471786672c167325a34dfef3a34d94ed))

## [0.4.2](https://github.com/AlexAegis/common/compare/v0.4.1...v0.4.2) (2023-07-06)


### Bug Fixes

* exported mocks should not use vi to avoid problems from version mismatches ([108d8c8](https://github.com/AlexAegis/common/commit/108d8c83ebab97b4f35cf953ee3e74d57490793b))

## [0.4.1](https://github.com/AlexAegis/common/compare/v0.4.0...v0.4.1) (2023-07-06)


### Features

* updated prettier ([b3a4bcb](https://github.com/AlexAegis/common/commit/b3a4bcb2ecb91cc2e7d6a32e87b57494ace0791b))

## [0.4.0](https://github.com/AlexAegis/common/compare/v0.3.2...v0.4.0) (2023-07-04)


### ⚠ BREAKING CHANGES

* **workspace-tools:** removed some functions as they are were moved to autotool

* **workspace-tools:** removed some functions as they are were moved to autotool ([480ea22](https://github.com/AlexAegis/common/commit/480ea22309c06a2c9b5574f65f99f3ff208784c2))


### Features

* remove unnecessary usage of deepMerge ([619dfbc](https://github.com/AlexAegis/common/commit/619dfbc0b525f18a709d48ba0cec29ae4dfe2c80))
* **workspace-tools:** now skipWorkspaceRoot lets the root through when not in a monorepo ([ba7f995](https://github.com/AlexAegis/common/commit/ba7f9950cf34e5399c5d364ab943ff9345f0ac9e))


### Bug Fixes

* removed unused dependency ([fb6bc4c](https://github.com/AlexAegis/common/commit/fb6bc4c2d0aebebcea9dc3b9269a0b1bbd5b8398))

## [0.3.2](https://github.com/AlexAegis/common/compare/v0.3.1...v0.3.2) (2023-07-01)


### Features

* **common:** extracted key dropping from deepMerge ([35dfba8](https://github.com/AlexAegis/common/commit/35dfba81a59f7af5b0d91a5d36adc349de1f97fb))
* **predicate:** also allow null ([1d6616a](https://github.com/AlexAegis/common/commit/1d6616a94e1794459122e33ca98272122a5990bb))

## [0.3.1](https://github.com/AlexAegis/common/compare/v0.3.0...v0.3.1) (2023-06-29)


### Features

* **predicate:** allow undefined ([2caf5f5](https://github.com/AlexAegis/common/commit/2caf5f57e0cdef32f1e3bfba377a4ede94655d47))

## [0.3.0](https://github.com/AlexAegis/common/compare/v0.2.5...v0.3.0) (2023-06-29)


### ⚠ BREAKING CHANGES

* **workspace-tools:** removed deprecated functions

### Features

* **match:** improved JsonMatcherFrom and related types ([ea0e9c8](https://github.com/AlexAegis/common/commit/ea0e9c8c42b5fd147f27a9e3c155080db5c43ec9))
* **workspace-tools:** added packageJson match based filtering and removed keywordCriteria ([c5f6afe](https://github.com/AlexAegis/common/commit/c5f6afe2433c92efcd0a07f8a6ee0597d47f85ed))
* **workspace-tools:** removed deprecated functions ([31733ae](https://github.com/AlexAegis/common/commit/31733aeced25d48cf1fcda753ce0c64f62af403f))

## [0.2.5](https://github.com/AlexAegis/common/compare/v0.2.4...v0.2.5) (2023-06-29)


### Features

* **common:** added groupBy function ([6298d85](https://github.com/AlexAegis/common/commit/6298d857965a03898f6445a979fcfb373a005ac4))
* **predicate:** added simple declarative predicates ([0b48eb1](https://github.com/AlexAegis/common/commit/0b48eb19c3013e43e747e2db590b164c2bd9ab19))
* **workspace-tools:** added a function to check if a string is a dependency field ([f3ee5ed](https://github.com/AlexAegis/common/commit/f3ee5ed9ac138efc1dca64d0f2ee744d0af79162))

## [0.2.4](https://github.com/AlexAegis/common/compare/v0.2.3...v0.2.4) (2023-06-27)


### Features

* **logging:** default loglevel is now INFO ([c8ee455](https://github.com/AlexAegis/common/commit/c8ee4554d07b2250a032db2ee009e7ddb5a6087e))
* **logging:** do not include the timestamp by default ([3615bd1](https://github.com/AlexAegis/common/commit/3615bd193fc752f5b994539d75f662a88faf022b))

## [0.2.3](https://github.com/AlexAegis/common/compare/v0.2.2...v0.2.3) (2023-06-20)


### Features

* **workspace-tools:** treat the default export as special ([788bb9e](https://github.com/AlexAegis/common/commit/788bb9e6f06684541699c04f904e5381d524aff4))

## [0.2.2](https://github.com/AlexAegis/js/compare/v0.2.1...v0.2.2) (2023-06-18)


### Features

* add directory finder ([d7ab3f5](https://github.com/AlexAegis/js/commit/d7ab3f5a7a6adb06ce36b6c4fe1037bdf492f7ee))
* **common:** add mapObject ([4673599](https://github.com/AlexAegis/js/commit/467359916d2c5b3040cf40dafd95cea8d81ad72d))
* **common:** deepMerge now supports arrays too ([277f403](https://github.com/AlexAegis/js/commit/277f403063b0d037dce14ec75df3193bba02720c))
* **workspace-tools:** mark types as nullable ([f9e8c20](https://github.com/AlexAegis/js/commit/f9e8c20338453f8e5f6b152e1172a0c7677d80a5))

## [0.2.1](https://github.com/AlexAegis/js/compare/v0.2.0...v0.2.1) (2023-05-23)


### Bug Fixes

* catch prettier errors mid format ([6dcd983](https://github.com/AlexAegis/js/commit/6dcd983ab9edb31aa0ad0153894720d96d33b2ec))

## [0.2.0](https://github.com/AlexAegis/js/compare/v0.1.8...v0.2.0) (2023-05-19)


### Features

* **common:** added deepFreeze ([2ea9a40](https://github.com/AlexAegis/js/commit/2ea9a40b602cdbbbb7a1320e5c083ad56412d2c2))
* **fs:** regular logging for readJson ([ab911b2](https://github.com/AlexAegis/js/commit/ab911b2ce2e89d50e8c2c796a1a9bae3fd249980))
* migrated to autotool ([e22a607](https://github.com/AlexAegis/js/commit/e22a6071f6a319198811583aa0dad462f5e53f1b))


### Bug Fixes

* depend on yargs types so they are available at the consumer ([c946b1d](https://github.com/AlexAegis/js/commit/c946b1d6cb6f1836338c9a1ee34eb543344ca20d))

## [0.1.8](https://github.com/AlexAegis/js/compare/v0.1.7...v0.1.8) (2023-05-15)


### Features

* added archetype to default ordering ([5b0a3cd](https://github.com/AlexAegis/js/commit/5b0a3cd5dd8136255e87b35973d0ee12fc108b22))
* **fs:** set the default indentation to 2 space for writeJson ([60e2f60](https://github.com/AlexAegis/js/commit/60e2f60b7608b347653c8a95d5216cdcfec840cf))

## [0.1.7](https://github.com/AlexAegis/js/compare/v0.1.6...v0.1.7) (2023-05-08)


### Features

* **workspace-tools:** added relative packagePathFromRootPackage ([c6283b9](https://github.com/AlexAegis/js/commit/c6283b9bb1b944e73fd452304b42520add9c94af))

## [0.1.6](https://github.com/AlexAegis/js/compare/v0.1.5...v0.1.6) (2023-05-05)


### Features

* **common:** add ItemOf type ([31eec9e](https://github.com/AlexAegis/js/commit/31eec9ed3fb7ac00d3c12282e05a8f9af89f768b))
* **match:** added match library ([55cafde](https://github.com/AlexAegis/js/commit/55cafde12f919217f56de06e3ddedd871ab026ce))

## [0.1.5](https://github.com/AlexAegis/js/compare/v0.1.4...v0.1.5) (2023-05-01)


### Features

* **workspace-tools:** expanded WorkspacePackage def to include more metadata ([14a7a77](https://github.com/AlexAegis/js/commit/14a7a773b45a4b60468cb0c38511270ab5456dc7))

## [0.1.4](https://github.com/AlexAegis/js/compare/v0.1.3...v0.1.4) (2023-04-22)

## [0.1.3](https://github.com/AlexAegis/js/compare/v0.1.2...v0.1.3) (2023-04-11)


### Features

* **workspace-tools:** prefer larger version on merge ([4984f93](https://github.com/AlexAegis/js/commit/4984f93114f3a3342cdd603ddcad5dfe21ace974))

## [0.1.2](https://github.com/AlexAegis/js/compare/v0.1.1...v0.1.2) (2023-04-11)

## [0.1.1](https://github.com/AlexAegis/js/compare/v0.1.0...v0.1.1) (2023-04-08)

## [0.1.0](https://github.com/AlexAegis/js/compare/v0.0.25...v0.1.0) (2023-04-08)


### Bug Fixes

* moved schemastore def to regular dependencies ([54e563b](https://github.com/AlexAegis/js/commit/54e563b0231257030651c0d752667930400f68c7))

## [0.0.25](https://github.com/AlexAegis/js/compare/v0.0.24...v0.0.25) (2023-04-08)


### Features

* add common commitlint config ([3f80d2e](https://github.com/AlexAegis/js/commit/3f80d2eaf5da005a912e8244ff9db05f89ac4b5d))
* added the replace type ([12687ee](https://github.com/AlexAegis/js/commit/12687ee97605441cae075d20aa7920eb935847a2))
* **workspace-tools:** added main and module fields ([59c367c](https://github.com/AlexAegis/js/commit/59c367c89bfd891656f008445c0e67464cd96063))


### Bug Fixes

* fix freshly introduced linting errors ([64ba21a](https://github.com/AlexAegis/js/commit/64ba21a4e0494ca1a2e2798b8c42e5e5d9132a88))

## [0.0.24](https://github.com/AlexAegis/js/compare/v0.0.23...v0.0.24) (2023-04-04)


### Features

* updated packages, migrated to common tooling ([a2bbe98](https://github.com/AlexAegis/js/commit/a2bbe98af83acf1a3526ee88549a66aab0c5c3d6))


### Bug Fixes

* reversed relative paths ([6267bcd](https://github.com/AlexAegis/js/commit/6267bcd51770e7d408cfdc638fc3b4de527fc025))

### [0.0.23](https://github.com/AlexAegis/js/compare/v0.0.22...v0.0.23) (2023-03-07)


### Features

* added findNearestFile ([b7da338](https://github.com/AlexAegis/js/commit/b7da3383649e0444b03c0cffb04dc5d0ed979e45))
* added groupByCommonNearestFile ([9acc947](https://github.com/AlexAegis/js/commit/9acc94705d76ce00ec060ea44e1fcece5de516a3))


### Bug Fixes

* copy log ([f6e243f](https://github.com/AlexAegis/js/commit/f6e243f8ec6fad17136b209bc41406b503a362f5))

### [0.0.22](https://github.com/AlexAegis/js/compare/v0.0.21...v0.0.22) (2023-03-05)


### Features

* **workspace-tools:** enable to usage of relativePathFromPackageToRoot in packageJson scripts ([9868c16](https://github.com/AlexAegis/js/commit/9868c1600ac0eee8163905188e6753f388672280))

### [0.0.21](https://github.com/AlexAegis/js/compare/v0.0.20...v0.0.21) (2023-02-26)


### Features

* **common:** add the modify type ([f8ee35f](https://github.com/AlexAegis/js/commit/f8ee35fc1c87b0e00c8f5d139cdcb69defca58d6))


### Bug Fixes

* **workspace-tools:** fix typo in ordering ([1628121](https://github.com/AlexAegis/js/commit/1628121075713e355f2aa8fbca20a6d4332d9fbd))
* **workspace-tools:** packageJson def ([6c392bb](https://github.com/AlexAegis/js/commit/6c392bb8e63af59256f576a3d637a9df111a80ca))

### [0.0.20](https://github.com/AlexAegis/js/compare/v0.0.19...v0.0.20) (2023-02-25)


### Features

* **common:** added async map-filter-mapFilter and regex normalizer ([f3a027f](https://github.com/AlexAegis/js/commit/f3a027f073a950276da6c0ec97e8a47c80dfdcc8))
* **common:** added the safe option ([1faa3fe](https://github.com/AlexAegis/js/commit/1faa3feccab1fdf16adc5757f75f94c8e9288ca7))
* **workspace-tools:** added is distributed file checker ([4b1d842](https://github.com/AlexAegis/js/commit/4b1d842078ba99860a89c9705c091c89964d3339))
* **workspace-tools:** remove has a safe option now ([241616e](https://github.com/AlexAegis/js/commit/241616efafed28e7721147f7681161295a2fbc3e))

### [0.0.19](https://github.com/AlexAegis/js/compare/v0.0.18...v0.0.19) (2023-02-25)


### Features

* **common:** added a tiny sleep utility) ([2b13aa7](https://github.com/AlexAegis/js/commit/2b13aa7dcc19ad062d2f70170fed84d429695497))
* **workspace-tools:** allow globs when removing from packages ([1c168d0](https://github.com/AlexAegis/js/commit/1c168d0cdf8e70ead99a1ed2e938b6f2b8b9a35b))

### [0.0.18](https://github.com/AlexAegis/js/compare/v0.0.17...v0.0.18) (2023-02-23)


### Features

* **workspace-tools:** added transformers and additional variables ([eab260b](https://github.com/AlexAegis/js/commit/eab260bd18190ad85775f9779911ec4db1b6e23e))

### [0.0.17](https://github.com/AlexAegis/js/compare/v0.0.16...v0.0.17) (2023-02-16)


### Bug Fixes

* **coverage-tools:** survive non-existent lcov files ([f7b0b7b](https://github.com/AlexAegis/js/commit/f7b0b7b965be91672e8998027259f4609597cdf0))

### [0.0.16](https://github.com/AlexAegis/js/compare/v0.0.15...v0.0.16) (2023-02-12)


### Bug Fixes

* **workspace-tools:** do not report folder as package when there is no package.json there ([a47378a](https://github.com/AlexAegis/js/commit/a47378a354aba2d92445ac83db33950082fcb8e4))
* **workspace-tools:** improved sorting prefrence normalizer ([b7f803f](https://github.com/AlexAegis/js/commit/b7f803f6f46d424c34a71bf033a69d3e14efc563))

### [0.0.15](https://github.com/AlexAegis/js/compare/v0.0.14...v0.0.15) (2023-02-07)


### Features

* **common:** added default ecmascript edition ([f7480b7](https://github.com/AlexAegis/js/commit/f7480b775bc8b0eeca8c5a2c4f3c3dd73c166f38))
* **workspace-tools:** file distribution now also fills in template ([3a66c37](https://github.com/AlexAegis/js/commit/3a66c3781dfd4d71b20b65fe5bc18d23e985d902))

### [0.0.14](https://github.com/AlexAegis/js/compare/v0.0.13...v0.0.14) (2023-02-06)


### Features

* **common:** added SomePartial and SomeRequired ([89ff670](https://github.com/AlexAegis/js/commit/89ff670ec8afb848d346bc620edac3912330fde4))
* **workspace-tools:** add remover ([e972833](https://github.com/AlexAegis/js/commit/e972833ddce8eba2abf8f5b25e03da4e40c6b1af))
* **workspace-tools:** now it can create target folders ([6d9fe90](https://github.com/AlexAegis/js/commit/6d9fe90364bfa58696656ef61e837df478f8ee29))

### [0.0.13](https://github.com/AlexAegis/js/compare/v0.0.12...v0.0.13) (2023-02-05)


### Features

* file distribution now can mark distributed files as executable ([f2ad388](https://github.com/AlexAegis/js/commit/f2ad388293b53b7b595bfaf9fe0f4d4eb31652f4))

### [0.0.12](https://github.com/AlexAegis/js/compare/v0.0.11...v0.0.12) (2023-02-05)


### Features

* add sorting preference normalizer for packageJson ([8d28d6b](https://github.com/AlexAegis/js/commit/8d28d6b3e922be5aa138487a14eceeb0f779ecb6))
* added keyword criteria ([0205c4a](https://github.com/AlexAegis/js/commit/0205c4a8e117b2648b5f6781ea3e098d898d82c1))

### [0.0.11](https://github.com/AlexAegis/js/compare/v0.0.10...v0.0.11) (2023-02-04)


### Features

* let deepMerge drop keys ([93111df](https://github.com/AlexAegis/js/commit/93111df484e8c4839866341d83835c392324cd07))

### [0.0.10](https://github.com/AlexAegis/js/compare/v0.0.9...v0.0.10) (2023-02-04)


### Features

* added the ability to substitute variables from the target packageJson when distributing items ([9d39c79](https://github.com/AlexAegis/js/commit/9d39c79db8397e84a8aba9e665fc205517e75778))

### [0.0.9](https://github.com/AlexAegis/js/compare/v0.0.8...v0.0.9) (2023-02-04)


### Features

* **workspace-tools:** added autosorter to packageJson distributor ([6c9bb18](https://github.com/AlexAegis/js/commit/6c9bb185e43871bffd1c46ce485328f1f5512b2c))

### [0.0.8](https://github.com/AlexAegis/js/compare/v0.0.7...v0.0.8) (2023-02-04)


### Features

* add a memoize function ([5022146](https://github.com/AlexAegis/js/commit/5022146e2e1a74be51c949672d92d12cebc6903a))


### Bug Fixes

* build coverage tools before using it ([0400b10](https://github.com/AlexAegis/js/commit/0400b1084a4333a0f4fc8db876b1b3d5dcca7397))
* yargs types ([2fe59a1](https://github.com/AlexAegis/js/commit/2fe59a162ebddbbbc74fd43c78b7aa3ff2b0c52b))

### [0.0.7](https://github.com/AlexAegis/js/compare/v0.0.6...v0.0.7) (2023-02-02)


### Features

* added a yargs builder, and tweaked logging template ([0958dfe](https://github.com/AlexAegis/js/commit/0958dfedb69b7e514111948f9ea4d1686aa9f461))

### [0.0.6](https://github.com/AlexAegis/js/compare/v0.0.5...v0.0.6) (2023-02-01)


### Features

* added cli-tools with default yargs stuff ([a0ffb77](https://github.com/AlexAegis/js/commit/a0ffb77503d3633fe5f04df1f603be90dbb86a94))

### [0.0.5](https://github.com/AlexAegis/js/compare/v0.0.4...v0.0.5) (2023-01-31)


### Features

* added a createLogger function ([904f5ae](https://github.com/AlexAegis/js/commit/904f5ae3fe531d04f19cde765b866934c983d4c6))
* move to tslog for logging ([db4f1b4](https://github.com/AlexAegis/js/commit/db4f1b43cc47429a34886ebc63f82206856ae3bf))


### Bug Fixes

* add missing options export ([8379735](https://github.com/AlexAegis/js/commit/837973555e6e3edecd550bebabb99d1657cdcae5))

### [0.0.4](https://github.com/AlexAegis/js/compare/v0.0.3...v0.0.4) (2023-01-30)


### Features

* new yargs helper for workspace collection only ([a015d72](https://github.com/AlexAegis/js/commit/a015d7270864b9263e6011f50f4c47d7126147dd))

### [0.0.3](https://github.com/AlexAegis/js/compare/v0.0.2...v0.0.3) (2023-01-30)


### Features

* added distribute packagejson items ([9a5c486](https://github.com/AlexAegis/js/commit/9a5c486341b20f3bd299cc3949747f7418d3023c))
* added sort-object ([a1c4f1c](https://github.com/AlexAegis/js/commit/a1c4f1c6e2d2240fbf70cba991a21ba34225795b))

### 0.0.2 (2023-01-30)


### Features

* add is-not-nullish to common ([58c48d2](https://github.com/AlexAegis/js/commit/58c48d2f05b6a0d09465377db46471be9dd6ce81))
* added logger package ([e27fb6f](https://github.com/AlexAegis/js/commit/e27fb6f69d89ab37c6c02ccb637a54450162d0b0))
* added workspace root retriever ([49f947b](https://github.com/AlexAegis/js/commit/49f947b4e809b3e0f063581e0bc15b1570fc6129))
* **common:** added deepMerge ([de2a098](https://github.com/AlexAegis/js/commit/de2a0984d43128ac1286f65ae453cebfb8fd78e4))
* fs ([c32cf22](https://github.com/AlexAegis/js/commit/c32cf227cbb4f773f6a369730cb7ab3ff8ed1ca0))
* migrated to latest autolib ([def2614](https://github.com/AlexAegis/js/commit/def2614619e822ac369ae0efe3fd1bd5e38ebe36))
* repo initial setup ([3ce6ac7](https://github.com/AlexAegis/js/commit/3ce6ac7e0af6934f464c90770e33a81c838a2c1f))
* **workspace-tools:** add collect-workspace-packages, find-lcov-reports ([6fb16b7](https://github.com/AlexAegis/js/commit/6fb16b7d5c23bde6390c0d4227c64e99ee87b42a))
* **workspace-tools:** moved file distributor ([b10d032](https://github.com/AlexAegis/js/commit/b10d03214082e23e498d36b4ba17ce514caa844d))


### Bug Fixes

* **workspace-tools:** tests ([e4e0297](https://github.com/AlexAegis/js/commit/e4e029724d2a75de7798c8e252815fbcd39d8fa3))
