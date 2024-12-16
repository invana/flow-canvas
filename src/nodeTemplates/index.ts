import DataTypeFieldsNode from "./DataTypeFieldsNode";
import GenericNode from "./GenericNode";
import CardNode from "./CardNode";
import CommentNode from "./CommentNode/CommentNode";
import { NodeTypes } from "@xyflow/react";
import AnnotationNode from "./AnnotationNode";

export const defaultNodeTypes: NodeTypes = {
    DataTypeFieldsNode: DataTypeFieldsNode,
    CommentNode: CommentNode,
    GenericNode: GenericNode,
    CardNode: CardNode,
    AnnotationNode: AnnotationNode,
    // DataStore: DataStoreNode,
// DerivedCollection: DerivedCollectionNode
};