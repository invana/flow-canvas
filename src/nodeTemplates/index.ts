import DataTypeFieldsNode from "./DataTypeFieldsNode";
import GenericNode from "./GenericNode";
import CardNode from "./CardNode";
import CommentNode from "./CommentNode/CommentNode";
import { NodeTypes } from "@xyflow/react";

export const defaultNodeTypes: NodeTypes = {
    DataTypeFieldsNode: DataTypeFieldsNode,
    CommentNode: CommentNode,
    GenericNode: GenericNode,
    CardNode: CardNode
    // DataStore: DataStoreNode,
// DerivedCollection: DerivedCollectionNode
};