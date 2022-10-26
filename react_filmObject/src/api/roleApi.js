import Http from "@/utils/http";

// 添加角色
export const addRoleApi = (name) => Http.instance.post("/role/addRoles", { name });

// 给定角色名称检查是否已经在服务器数据端存在
export const checkRoleNameExistsApi = (name) => Http.instance.post("/role/checkRoleNameExists", { name });

// 获取角色列表数据
export const getRoleListApi = (roleName = "") => Http.instance.get("/role/roleList?roleName=" + roleName);

// 根据角色id返回对应的记录
export const getRoleApi = (id) => Http.instance.get(`/role/getRole/${id}`);

// 修改角色
export const editRoleApi = (id, name) => Http.instance.post(`/role/editRole/${id}`, { name });

// 删除角色
export const delRoleApi = (id) => Http.instance.get(`/role/delRole/${id}`);

// 获取当前角色下面的用户
export const getRoleToUserList = (roleId) => Http.instance.get(`/role/uidToRole/${roleId}`);

// 添加用户到指定的角色中
export const addUserToRole = (roleId, selectedUserIds) =>
  Http.instance.post(`/role/addUserToRole/${roleId}`, selectedUserIds);

// 获取角色对应权限列表
export const getRoleToAuthApi = (roleId) => Http.instance.get(`/role/roleToAuth/${roleId}`);
