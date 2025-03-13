const QuizResult = require("../models/QuizResult");
const Question = require("../models/Question");

// Function to determine skin type based on answer weights
const determineSkinType = (answers) => {
    const totalWeight = answers.reduce((sum, answer) => sum + (answer.weight || 0), 0);
    const minWeight = answers.length * 1; // 17 (if all answers are the lowest weight)
    const maxWeight = answers.length * 4; // 68 (if all answers are the highest weight)

    const range = maxWeight - minWeight;
    const normalizedScore = ((totalWeight - minWeight) / range) * 100;

    if (normalizedScore <= 25) return "Dry";
    if (normalizedScore <= 50) return "Combination";
    if (normalizedScore <= 75) return "Normal";
    return "Oily";
};

// Save quiz result
const saveQuizResult = async (req, res) => {
    try {
        const { answers } = req.body;
        const userID = req.user ? req.user._id : null; // Lấy userID từ token nếu có

        if (!answers || answers.length === 0) {
            return res.status(400).json({ message: "Answers are required." });
        }

        const skinType = determineSkinType(answers); // Tính loại da

        // Tạo document mới và lưu vào database
        const newQuizResult = new QuizResult({
            userID,
            answers,  // Lưu cả danh sách câu trả lời
            skinType,
        });

        await newQuizResult.save();

        res.status(201).json({
            message: "Quiz result saved successfully!",
            quizResult: newQuizResult,
        });
    } catch (error) {
        console.error("Error saving quiz result:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// Get all results (for admin)
const getAllResults = async (req, res) => {
    try {
        let { page = 1, limit = 10, sortBy = "createdDate", order = "desc", skinType } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        order = order === "asc" ? 1 : -1; // Convert order to MongoDB format

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return res.status(400).json({ message: "Invalid pagination parameters." });
        }

        // Build query
        const query = {};
        if (skinType) query.skinType = skinType; // Filter by skin type if provided

        // Count total results matching the query
        const totalResults = await QuizResult.countDocuments(query);
        const totalPages = Math.ceil(totalResults / limit);

        // Fetch results with filtering, sorting, and pagination
        const results = await QuizResult.find(query)
            .populate("userID", "name email")
            .sort({ [sortBy]: order }) // Dynamic sorting
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            totalResults,
            totalPages,
            currentPage: page,
            results,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get quiz results for a specific user
const getUserResults = async (req, res) => {
    try {
        const userId = req.user._id; // Lấy userId từ token

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const results = await QuizResult.find({ userID: userId })
            .sort({ createdDate: -1 });

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  

module.exports = {
    saveQuizResult,
    getAllResults,
    getUserResults,
    determineSkinType,
};