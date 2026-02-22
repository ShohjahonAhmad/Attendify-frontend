export default function validateCSV(file) {
  const faultyRows = [];

  if (file.length === 0) {
    return { valid: false, errorMessage: "CSV file is empty" };
  }

  for (let i = 0; i < file.length; i++) {
    const student = file[i];
    if (!("firstName" in student) || student.firstName.trim() == "") {
      faultyRows.push(i + 1);
      continue;
    }
    if (!("lastName" in student) || student.lastName.trim() == "") {
      faultyRows.push(i + 1);
      continue;
    }
    if (
      !("uniqueIdentifier" in student) ||
      student.uniqueIdentifier.trim() == ""
    ) {
      faultyRows.push(i + 1);
      continue;
    }
    if (
      !("email" in student) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(student.email.trim())
    ) {
      faultyRows.push(i + 1);
      continue;
    }
    if (!("institution" in student) || student.institution.trim() == "") {
      faultyRows.push(i + 1);
      continue;
    }
  }

  if (faultyRows.length == 0) {
    return { valid: true };
  }

  return {
    valid: false,
    errorMessage: `Following rows are invalid: ${faultyRows.join(", ")}`,
  };
}
