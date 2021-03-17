import { getCallValue } from '../util'

export default function requireSyncProperty(
  { types: t, template },
  { noWebpack },
) {
  const statements = template.ast(`
    const id = this.resolve(props)

    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id)
    }

    return eval('module.require')(id)
  `)

  return ({ callPath }) => {
    t.objectMethod(
      'method',
      t.identifier('requireSync'),
      [t.identifier('props')],
      t.blockStatement(
        noWebpack
          ? [
              t.returnStatement(
                t.memberExpression(
                  t.callExpression(t.identifier('require'), [
                    getCallValue(t, callPath),
                  ]),
                  t.identifier('default'),
                ),
              ),
            ]
          : statements,
      ),
    )
  }
}
