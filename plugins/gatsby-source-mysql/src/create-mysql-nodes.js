const createNodeHelpers = require('gatsby-node-helpers').default;
const pluralize = require('pluralize');
const imageType = require('image-type');

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: 'mysql'
});

const { createNodeFactory: createImageNodeFactory } = createNodeHelpers({
  typePrefix: 'mysqlImage'
});

function reduceChildFields(childEntities, nodeId) {
  let childFields = {};

  childEntities.forEach(
    ({
      name: childName,
      idFieldName: childIdFieldName,
      foreignKey,
      cardinality = 'OneToMany',
      __sqlResult
    }) => {
      const childIds = __sqlResult
        .filter(child => child[foreignKey] === nodeId)
        .map(child => generateNodeId(childName, child[childIdFieldName]));

      if (cardinality === 'OneToMany') {
        childFields[`${pluralize.plural(childName)}___NODE`] = childIds;
      } else {
        childFields[`${pluralize.singular(childName)}___NODE`] = childIds[0];
      }
    }
  );

  return childFields;
}

function mapSqlResults(
  __sqlResult,
  { parentName, foreignKey, childEntities, idFieldName }
) {
  return __sqlResult.map(result => {
    const nodeId = result[idFieldName];
    const parentField =
      parentName && foreignKey
        ? {
            [`${parentName}___NODE`]: generateNodeId(
              parentName,
              result[foreignKey]
            )
          }
        : {};

    const childFields = reduceChildFields(childEntities, nodeId);

    return Object.assign(
      {},
      result,
      {
        id: nodeId
      },
      parentField,
      childFields
    );
  });
}

function createMysqlNodes(
  { name, __sqlResult, idFieldName, parentName, foreignKey, imageFieldNames },
  allSqlResults,
  createNode
) {
  const MySqlNode = createNodeFactory(name);
  console.log({ imageFieldNames });
  const childEntities = allSqlResults.filter(
    ({ parentName }) => !!parentName && parentName === name
  );

  if (Array.isArray(__sqlResult)) {
    const sqlNodes = mapSqlResults(
      __sqlResult,
      { foreignKey, parentName, childEntities, idFieldName },
      childEntities
    );

    const MySqlImageNode = createImageNodeFactory(name);

    sqlNodes.forEach(node => {
      const resultNode = MySqlNode(node);
      createNode(resultNode);

      imageFieldNames.forEach(field => {
        const image = node[field];

        if (image && Buffer.isBuffer(image)) {
          const { ext, mime } = imageType(image);
          const imageNode = MySqlImageNode({
            id: `${resultNode.id} >> Image`,
            extension: ext,
            parent: resultNode.id,
            internal: {
              mediaType: mime
            }
          });
          createNode(imageNode);
        }
      });
    });
  }
}

module.exports = createMysqlNodes;
