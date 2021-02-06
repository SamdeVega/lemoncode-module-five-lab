import * as apiModel from "./api/project.api-model";
import { mapProjectFromApiToVm as projectMapper } from "./project.mapper";

describe.only("mapper specs", () => {
  describe("when the api does not return a project", () => {
    it("creates an empty project", () => {
      const emptyProject = {
        id: "",
        name: "",
        externalId: "",
        comments: "",
        isActive: false,
        employees: []
      };

      expect(projectMapper(undefined)).toEqual(emptyProject);
      expect(projectMapper(null)).toEqual(emptyProject);
    });
  });

  describe("when the api returns a project", () => {
    it("maps to a view model project", () => {
      const aProject: apiModel.Project = {
        employees: [],
        id: "irrelevant",
        isActive: true,
        name: "irrelevant"
      };

      expect(projectMapper(aProject)).toEqual(aProject);
    });

    describe("without employee sumaries", () => {
      it("maps to a view model project without employees", () => {
        const aProject: apiModel.Project = {
          employees: [],
          id: "irrelevant",
          isActive: true,
          name: "irrelevant"
        };

        expect(projectMapper(aProject).employees).toHaveLength(0);
      });
    });

    describe("with employee sumaries", () => {
      it("maps to a view model project with employees", () => {
        const newProject: apiModel.Project = {
          employees: [
            {
              id: "jd",
              employeeName: "John Doe"
            }
          ],
          id: "irrelevant",
          isActive: true,
          name: "irrelevant"
        };

        expect(projectMapper(newProject).employees).toHaveLength(1);
        expect(projectMapper(newProject).employees[0].id).toEqual("jd");
        expect(projectMapper(newProject).employees[0].employeeName).toEqual(
          "John Doe"
        );
      });
    });
  });
});
