const FileTree = ({ tree }) => {
  const renderTree = (node) => {
    return Object.entries(node).map(([key, value]) => (
      <div key={key} className="tree-item">
        {value ? "📁" : "📄"} {key}
        {value && renderTree(value)}
      </div>
    ));
  };

  return <div>{renderTree(tree)}</div>;
};

export default FileTree;