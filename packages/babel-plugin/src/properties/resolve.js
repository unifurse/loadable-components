import { getCallValue } from '../util'

export default function resolveProperty({ types: t, template }) {
  const buildStatements = template`
    if (require.resolveWeak) {
      return require.resolveWeak(ID)
    }

    return eval('require.resolve')(ID)
  `

  return ({ callPath, funcPath }) =>
    t.objectMethod(
      'method',
      t.identifier('resolve'),
      funcPath.node.params,
      t.blockStatement(buildStatements({ ID: getCallValue(t, callPath) })),
    )
}
