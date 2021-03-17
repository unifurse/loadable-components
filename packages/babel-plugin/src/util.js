/* eslint-disable import/prefer-default-export */

export function getImportArg(callPath) {
  return callPath.get('arguments.0')
}

export function getCallValue(t, callPath) {
  const importArg = getImportArg(callPath)
  if (importArg.isTemplateLiteral()) {
    return t.templateLiteral(importArg.node.quasis, importArg.node.expressions)
  }
  if (importArg.isBinaryExpression()) {
    return t.BinaryExpression(
      importArg.node.operator,
      importArg.node.left,
      importArg.node.right,
    )
  }
  return t.stringLiteral(importArg.node.value)
}
