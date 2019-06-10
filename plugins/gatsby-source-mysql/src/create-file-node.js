// Copied from gatsby-source-filesystem and modify
const prettyBytes = require(`pretty-bytes`);

const { createContentDigest } = require(`./fallback`);
const imageType = require('image-type');

exports.createBufferFileNode = function createBufferFileNode({
  buffer,
  createNodeId,
  fieldName,
  parentId
}) {
  if (buffer && Buffer.isBuffer(buffer)) {
    const { ext, mime } = imageType(buffer);
    const internal = {
      contentDigest: createContentDigest(buffer),
      type: `MysqlImage`,
      mediaType: mime ? mime : `application/octet-stream`
    };
    return {
      id: createNodeId(`${parentId}-Image`),
      name: `${parentId}-${fieldName}`,
      children: [],
      parent: null,
      internal,
      extension: ext,
      size: buffer.length,
      prettySize: prettyBytes(buffer.length)
    };
  }
  return null;
};
