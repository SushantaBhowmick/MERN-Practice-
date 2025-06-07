exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    console.log("file",file)
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    console.log(imageUrl)

    res.status(201).json({
        msg:"Image uploaded successfully!",
        success:true,
        imageUrl
    })

  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
};
