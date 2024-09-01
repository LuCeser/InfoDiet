import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import NodeType from "./NodeType";
import SourceType from "./SourceType";

class Node extends Model {
    public nodeId!: number;
    public typeId!: number;
    public name!: string;
    public properties?: object;
    public url?: string;
    public sourceType?: number;
    public readonly publishedDate!: Date;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

Node.init(
    {
      nodeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: NodeType,
          key: 'type_id',
        },
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      publishedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      properties: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      sourceType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: SourceType,
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Node',
      tableName: 'nodes', // 确保使用正确的表名
      underscored: true,
    }
  );

  Node.belongsTo(NodeType, { foreignKey: 'typeId', as : 'nodeType' });
  Node.belongsTo(SourceType, { foreignKey: 'sourceType', as: 'sourceType' })

  export default Node;