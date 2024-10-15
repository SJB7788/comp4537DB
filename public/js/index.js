class SendRequest {
  constructor() {}

  async sendInsertRequest(json) {
    const response = await fetch("https://lab05-server-axb7bdebddb4b6d2.canadacentral-01.azurewebsites.net/insert", {
      method: "POST",
      body: json,
      headers: { "Content-Type": "application/json" },
    });

    const myJson = await response.json();
    return myJson;
  }

  async sendQueryPostRequest(json) {
    const response = await fetch("https://lab05-server-axb7bdebddb4b6d2.canadacentral-01.azurewebsites.net/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    });

    const myJson = await response.json();
    return myJson;
  }

  async sendQueryGetRequest(arg) {
    const response = await fetch(
      `https://lab05-server-axb7bdebddb4b6d2.canadacentral-01.azurewebsites.net/query?query=${arg}`
    );
    const jsonRes = await response.json();
    return jsonRes;
  }
}

class FormatIndex {
  constructor() {
    this.insertButton = document.getElementById("insertButton");
    this.queryButton = document.getElementById("queryButton");

    this.insertResults = document.getElementById("insert_response");
    this.queryResults = document.getElementById("query_response");

    this.request = new SendRequest();
  }

  async insertForm() {
    this.insertButton.addEventListener("click", async () => {
      const jsonBody = {
        patients: [
        {"first_name": "Sara", "last_name": "Brown", 
          dob: "1901-01-01", "address": "121 St 100 Ave", "phone_number": "7788554755", "email": "SaraBrown23@gmail.com"},
        {"first_name": "John", "last_name": "Smith", 
          dob: "1941-01-01", "address": "124 St 87 Ave", "phone_number": "6042335193", "email": "JohnSmith1234@gmail.com"},
        {"first_name": "Jack", "last_name": "Ma", 
          dob: "1961-01-30", "address": "91 St 1 Ave", "phone_number": "2564778563", "email": "JackMaAliExpress@gmail.com"},
        {"first_name": "Elon", "last_name": "Musk", 
          dob: "1999-01-01", "address": "0 St 0 Ave", "phone_number": "1234567789", "email": "twitter@gmail.com"}
        ]
      };
      const response = await this.request.sendInsertRequest(JSON.stringify(jsonBody));
      if (response) {
        this.insertResults.innerHTML = JSON.stringify(response);
      } else {
        this.insertResults.innerHTML = "Something went wrong!";
      }
    });
  }

  async requestForm() {
    this.queryButton.addEventListener("click", async () => {
      const queryTextArea = document.getElementById("query_text_area");
      const queryString = queryTextArea.value;
      const requestType = document.getElementById("request_type").value;

      switch (requestType) {
        case "GET":
          try {
            const getResponse = await this.request.sendQueryGetRequest(
              queryString
            );
            if (getResponse) {
              this.queryResults.innerHTML = JSON.stringify(getResponse);
            } else {
              this.queryResults.innerHTML = "Something went wrong!";
            }
          } catch (error) {
            console.error("Error:", error);
          }
          return;
        case "POST":
          const jsonBody = {
            query: queryString,
          };
          try {
            const json = JSON.stringify(jsonBody)
            const postResponse = await this.request.sendQueryPostRequest(
              json
            );
            if (postResponse) {
              this.queryResults.innerHTML = JSON.stringify(postResponse);
            } else {
              this.queryResults.innerHTML = "Something went wrong!";
            }
          } catch (error) {
            console.error("Error: ", error);
          }
          return;
      }
    });
  }
}

const format = new FormatIndex();
await format.insertForm();
await format.requestForm();
