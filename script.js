  // Initialize Flatpickr for date fields
  document.querySelectorAll('.calendar').forEach((el) => {
    flatpickr(el, {
      dateFormat: "Y-m-d", // ISO format (YYYY-MM-DD)
    });
  });

  function generateFile() {
    // Fetch form data
    let employerId = document.getElementById("employerId").value;
    while (employerId.length < 13) {
      employerId = "0" + employerId;
    }
    const routingCodeEmployer = document.getElementById("routingCodeEmployer").value;
    const employeeId = document.getElementById("employeeId").value;
    const routingCodeEmployee = document.getElementById("routingCodeEmployee").value;
    const iban = document.getElementById("iban").value;
    const payStartDate = document.getElementById("payStartDate").value;
    const payEndDate = document.getElementById("payEndDate").value;
    const fixedIncome = parseFloat(document.getElementById("fixedIncome").value).toFixed(2);
    const variableIncome = parseFloat(document.getElementById("variableIncome").value).toFixed(2);
    const daysLeave = document.getElementById("daysLeave").value;
    const fileCreationDate = document.getElementById("fileCreationDate").value;
    const fileCreationTime = document.getElementById("fileCreationTime").value.replace(":", "");

    const totalSalary = (parseFloat(fixedIncome) + parseFloat(variableIncome)).toFixed(2);
    const salaryMonth = payStartDate.substring(5, 7) + payStartDate.substring(0, 4); // MMYYYY format

    const edrRecord = `EDR,${employeeId},${routingCodeEmployee},${iban},${payStartDate},${payEndDate},31,${fixedIncome},${variableIncome},${daysLeave}`;
    const scrRecord = `SCR,${employerId},${routingCodeEmployer},${fileCreationDate},${fileCreationTime},${salaryMonth},1,${totalSalary},AED,NONE`;

    const wpsContent = `${edrRecord}\n${scrRecord}`;
    const blob = new Blob([wpsContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${employerId}${fileCreationDate.replace(/-/g, "").substring(2)}${fileCreationTime}.sif`;
    link.click();
  }