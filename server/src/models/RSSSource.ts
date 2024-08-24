import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

// RSS订阅源
class RSSSource extends Model {
    public id!: number;
    public name!: string;
    public url!: string;
    public description?: string;
    public lastFetched?: Date;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

RSSSource.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        lastFetched: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'RSSSource'
    }
);

export default RSSSource;