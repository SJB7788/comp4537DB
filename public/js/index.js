class SendRequest {
  constructor() {}

  async sendInsertRequest(json) {
    const response = await fetch("http://localhost:8000/insert", {
      method: "POST",
      body: json,
      headers: { "Content-Type": "application/json" },
    });

    const myJson = await response.json();
    return myJson;
  }

  async sendQueryPostRequest(json) {
    const response = await fetch("http://localhost:8000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    });

    const myJson = await response.json();
    return myJson;
  }

  async sendQueryGetRequest(arg) {
    const response = await fetch(`http://localhost:8000/query?query=${arg}`);
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
        "Sara Brown": "1901-01-01",
        "John Smith": "1941-01-01",
        "Jack Ma": "1961-01-30",
        "Elon Musk": "1999-01-01"
      };
      const response = await this.request.sendInsertRequest(
        JSON.stringify(jsonBody)
      );
      if (response) {
        this.insertResults.innerHTML = response;
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
          const getResponse = await this.request.sendQueryGetRequest(
            queryString
          );
          if (getResponse) {
            this.queryResults.innerHTML = JSON.stringify(getResponse);
          } else {
            this.queryResults.innerHTML = "Something went wrong!";
          }
          return;
        case "POST":
          const jsonBody = {
            "query": queryString,
          };
          
          const postResponse = await this.request.sendQueryPostRequest(JSON.stringify(jsonBody));
          if (postResponse) {
            this.queryResults.innerHTML = JSON.stringify(postResponse);
          } else {
            this.queryResults.innerHTML = "Something went wrong!";
          }
          return;
      }
    });
  }
}

const format = new FormatIndex();
await format.insertForm();
await format.requestForm();
