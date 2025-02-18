import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";

const QuestionCard = ({ question, onDelete, onEdit }) => {
  return (
    <Card sx={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", transition: "transform 0.2s ease-in-out", "&:hover": { transform: "scale(1.02)" } }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {question.questionText}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Answer Options:
        </Typography>
        {question.answerOptions.map((option, index) => (
          <Typography key={index} variant="body2" color="textSecondary">
            - {option.answerText} (Weight: {option.weight})
          </Typography>
        ))}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button size="small" variant="outlined" color="primary" onClick={() => onEdit(question)}>
            Edit
          </Button>
          <Button size="small" variant="outlined" color="error" onClick={() => onDelete(question._id)}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, questionId: null });
  const [editDialog, setEditDialog] = useState({ open: false, question: null });
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswerOptions, setNewAnswerOptions] = useState([{ answerText: "", weight: 0 }]);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions.");
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, questionId: id });
  };

  const confirmDelete = () => {
    const { questionId } = deleteDialog;
    fetch(`http://localhost:5000/api/questions/${questionId}`, { method: "DELETE" })
      .then(() => setQuestions(questions.filter((q) => q._id !== questionId)))
      .catch((err) => console.error("Error deleting question:", err));
    setDeleteDialog({ open: false, questionId: null });
  };

  const handleEdit = (question) => {
    setEditDialog({ open: true, question });
    setNewQuestion(question.questionText);
    setNewAnswerOptions(question.answerOptions);
  };

  const handleAddOption = () => {
    setNewAnswerOptions([...newAnswerOptions, { answerText: "", weight: 0 }]);
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...newAnswerOptions];
    updatedOptions[index][field] = value;
    setNewAnswerOptions(updatedOptions);
  };

  const handleAdd = () => {
    if (newQuestion.trim() === "") {
      alert("Question text cannot be empty!");
      return;
    }
  
    if (newAnswerOptions.some((option) => option.answerText.trim() === "")) {
      alert("All answer options must have text!");
      return;
    }
  
    const questionData = { questionText: newQuestion, answerOptions: newAnswerOptions };
  
    // Kiểm tra nếu đang chỉnh sửa câu hỏi
    if (editDialog.question) {
      console.log("Updating question:", questionData); // Kiểm tra dữ liệu đang sửa
      fetch(`/api/questions/${editDialog.question._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update question.");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Updated question:", data); // Kiểm tra câu hỏi đã được cập nhật
          setQuestions(questions.map((q) => (q._id === data._id ? data : q))); // Cập nhật câu hỏi trong state
          setEditDialog({ open: false, question: null }); // Đóng dialog sau khi cập nhật
          setNewQuestion(""); // Xóa nội dung câu hỏi sau khi thêm
          setNewAnswerOptions([{ answerText: "", weight: 0 }]); // Đặt lại các tùy chọn trả lời
        })
        .catch((err) => {
          console.error("Error updating question:", err);
          alert("Error updating question: " + err.message);
        });
    } else {
      console.log("Adding new question:", questionData); // Kiểm tra dữ liệu thêm mới
      // Thêm câu hỏi mới
      fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add new question.");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Added new question:", data); // Kiểm tra câu hỏi mới
          setQuestions((prevQuestions) => [...prevQuestions, data]); // Thêm câu hỏi mới vào danh sách mà không cần tải lại dữ liệu
          setEditDialog({ open: false, question: null }); // Đóng dialog sau khi thêm
          setNewQuestion(""); // Xóa nội dung câu hỏi sau khi thêm
          setNewAnswerOptions([{ answerText: "", weight: 0 }]); // Đặt lại các tùy chọn trả lời
        })
        .catch((err) => {
          console.error("Error adding question:", err);
          alert("Error adding question: " + err.message);
        });
    }
  };
  

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Sidebar />
      <Container sx={{ ml: 3, p: "24px", maxWidth: "900px" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Question Management
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: "20px" }} onClick={() => setEditDialog({ open: true, question: null })}>
          Add New Question
        </Button>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {questions.map((question) => (
              <Grid item xs={12} sm={6} key={question._id}>
                <QuestionCard question={question} onDelete={handleDelete} onEdit={handleEdit} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, question: null })}>
        <DialogTitle>{editDialog.question ? "Edit Question" : "Add Question"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question Text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Answer Options
          </Typography>
          {newAnswerOptions.map((option, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, mt: 2 }}>
              <TextField
                label={`Option ${index + 1} Text`}
                value={option.answerText}
                onChange={(e) => handleOptionChange(index, "answerText", e.target.value)}
                fullWidth
              />
              <TextField
                label={`Weight`}
                type="number"
                value={option.weight}
                onChange={(e) => handleOptionChange(index, "weight", e.target.value)}
                fullWidth
              />
            </Box>
          ))}
          <Button onClick={handleAddOption} sx={{ mt: 2 }} variant="outlined" color="primary">
            Add Answer Option
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, question: null })} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, questionId: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this question?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, questionId: null })} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuestionManagement;
