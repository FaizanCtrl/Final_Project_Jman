const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TeamService {
  async getAllTeams() {
    return await prisma.team.findMany({
      include: {
        department: true, // Assuming you have a relation with Designation
      },
    });
  }

  async getAllTeamsByDepartment(departmentId) {
    console.log(departmentId);
    try {
      const teams = await prisma.team.findMany({
        where: { departmentId: departmentId },
      });
      return teams;
    } catch (error) {
      throw new Error("Error fetching teams: " + error.message);
    }
  }
  async createTeam(data) {
    if (data.departmentId) {
      data.departmentId = parseInt(data.departmentId);
    }
    return await prisma.team.create({
      data: {
        name: data.name,
        departmentId: data.departmentId,
      },
    });
  }

  async updateTeam(id, data) {
    if (data.departmentId) {
      data.departmentId = parseInt(data.departmentId);
    }
    return await prisma.team.update({
      where: { id },
      data,
    });
  }

  async deleteTeam(id) {
    return await prisma.team.delete({
      where: { id },
    });
  }

  async findTeamById(id) {
    return await prisma.team.findUnique({
      where: { id },
    });
  }
}

module.exports = new TeamService();
