import UserEntity from "../../entities/user_entity";
import SqlModel from "./sql_model";

type UserSqlModel = UserEntity & SqlModel;

export default UserSqlModel;