import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

// RSS订阅源
class RSSSource extends Model {
    public id!: number;
    public url!: string;
    public title!: string;
    public description?: string;
    public lastFetched?: Date;
    public enabled!: boolean;
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
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        lastFetched: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'RSSSource'
    }
);

export default RSSSource;