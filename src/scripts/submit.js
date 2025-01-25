async function submit() {
    const formData = {};
    Object.keys(localStorage).forEach(key => {
        formData[key] = localStorage.getItem(key);
    });
    console.log(formData);

    try {
        Object.keys(localStorage).forEach(key => {
            localStorage.removeItem(key);
        });

        const response = await fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Form data inserted successfully");
            window.location.href='${pages[0].name}'
        } else {
            alert("Error inserting form data");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error inserting form data");
    }
}