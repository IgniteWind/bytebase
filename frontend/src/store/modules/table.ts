import axios from "axios";
import {
  ResourceObject,
  Principal,
  TableState,
  DatabaseId,
  Table,
} from "../../types";

function convert(table: ResourceObject, rootGetters: any): Table {
  const creator = table.attributes.creator as Principal;
  const updater = table.attributes.updater as Principal;

  return {
    ...(table.attributes as Omit<Table, "id" | "creator" | "updater">),
    id: parseInt(table.id),
    creator,
    updater,
  };
}

const state: () => TableState = () => ({
  tableListByDatabaseId: new Map(),
});

const getters = {
  tableListByDatabaseId:
    (state: TableState) =>
    (databaseId: DatabaseId): Table[] => {
      return state.tableListByDatabaseId.get(databaseId) || [];
    },
};

const actions = {
  async fetchTableListByDatabaseId(
    { commit, rootGetters }: any,
    databaseId: DatabaseId
  ) {
    const tableList = (
      await axios.get(`/api/database/${databaseId}/table`)
    ).data.data.map((table: ResourceObject) => {
      return convert(table, rootGetters);
    });

    commit("setTableListByDatabaseId", { databaseId, tableList });
    return tableList;
  },
};

const mutations = {
  setTableListByDatabaseId(
    state: TableState,
    {
      databaseId,
      tableList,
    }: {
      databaseId: DatabaseId;
      tableList: Table[];
    }
  ) {
    state.tableListByDatabaseId.set(databaseId, tableList);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};