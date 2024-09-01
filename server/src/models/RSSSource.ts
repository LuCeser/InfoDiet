import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

// RSS订阅源
class RSSSource extends Model {
    public id!: number;
    public url!: string;
    public title!: string;
    public description?: string;
    public fetchInterval!: number;
    public dailyFetchTime?: string; // for daily fetch time
    public lastFetched?: Date;
    public enabled!: boolean;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

RSSSource.init(
    {
        id: {
            type: DataTypes.BIGINT,
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
        fetchInterval: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 60,
            field: 'fetch_interval',
        },
        dailyFetchTime: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^([01]\d|2[0-3]):([0-5]\d)$/
            },
            field: 'daily_fetch_time',
        },
        lastFetched: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_fetched',
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'RSSSource',
        tableName: 'rss_sources',
        underscored: true,
    }
);

export default RSSSource;