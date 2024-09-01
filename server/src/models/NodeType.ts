import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class NodeType extends Model {
    public nodeId!: number;
    public typeName!: string;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

NodeType.init(
    {
      nodeTypeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },
      typeName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },
    },
    {
      sequelize,
      modelName: "NodeType",
      tableName: "node_type",
      underscored: true,
    }
);

export default NodeType;