const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DepartmentService {
  async getAllDepartments() {
    return await prisma.department.findMany();
  }

  async createDepartment(data) {
    return await prisma.department.create({
      data: {
        name: data.name,
      },
    });
  }

  async updateDepartment(id, name) {
    return await prisma.department.update({
      where: { id },
      data: {
        name: name
      },
    });
  }

  async deleteDepartment(id) {
    return await prisma.department.delete({
      where: { id },
    });
  }

  async findDepartmentById(id) {
    return await prisma.department.findUnique({
      where: { id },
    });
  }
}

module.exports = new DepartmentService();
