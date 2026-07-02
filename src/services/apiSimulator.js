const simulateApi = (data) =>

  new Promise((resolve, reject) => {

    setTimeout(() => {

      if (Math.random() < 0.05) {

        reject(
          new Error(
            "Server unavailable. Please try again."
          )
        );

      } else {

        resolve(data);

      }

    }, 500);

  });

export default simulateApi;