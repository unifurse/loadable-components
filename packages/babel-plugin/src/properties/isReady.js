export default function isReadyProperty({ types: t, template }, { noWebpack }) {
  const statements = template.ast(`
    const key=this.resolve(props)
    if (this.resolved[key] !== true) {
      return false
    }

    if (typeof __webpack_modules__ !== 'undefined') {
      return !!(__webpack_modules__[key])
    }

    return false
  `)

  return () =>
    t.objectMethod(
      'method',
      t.identifier('isReady'),
      [t.identifier('props')],
      t.blockStatement(
        noWebpack ? [t.returnStatement(t.booleanLiteral(true))] : statements,
      ),
    )
}
