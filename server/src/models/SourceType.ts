import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class SourceType extends Model {
    public sourceTypeId!: number;
    public name!: string;
    public processingRules!: object;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
  }

  SourceType.init(
    {
      sourceTypeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },
      sourceName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "name",
      },
      processingRules: {
        type: DataTypes.JSON,
        allowNull: true,
        field: 'processing_rules',
      },
    },
    {
      sequelize,
      modelName: 'SourceType',
      tableName: 'source_types',
      underscored: true,
    }
  );

  export default SourceType;