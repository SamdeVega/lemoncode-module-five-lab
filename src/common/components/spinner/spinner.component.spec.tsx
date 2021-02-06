import { render, screen } from "@testing-library/react";
import React from "react";
import { SpinnerComponent } from "./spinner.component";
import * as promiseTracker from "react-promise-tracker/lib/trackerHook";

describe("SpinnerComponent", () => {
  it("should be rendered when there's a promise in progress", async () => {
    jest
      .spyOn(promiseTracker, "usePromiseTracker")
      .mockReturnValue({ promiseInProgress: true });

    render(<SpinnerComponent />);

    expect(await screen.findByRole("modal")).toBeInTheDocument;
  });

  it("shouldn't be rendered when there's no promise in progress", async () => {
    jest
      .spyOn(promiseTracker, "usePromiseTracker")
      .mockReturnValue({ promiseInProgress: false });

    render(<SpinnerComponent />);

    expect(screen.queryByRole("modal")).not.toBeInTheDocument;
  });
});
