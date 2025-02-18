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
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";

const QuestionCard = ({ question, onDelete }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
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
          <Button size="small" variant="outlined" color="primary">
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

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch questions.");
        }
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

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Sidebar />
      <Container sx={{ ml: 3, p: "24px", maxWidth: "900px" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Question Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: "20px", borderRadius: "8px", textTransform: "none" }}
        >
          Add New Question
        </Button>

        {/* Hiển thị loading nếu đang tải dữ liệu */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          // Hiển thị thông báo lỗi nếu fetch thất bại
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {questions.map((question) => (
              <Grid item xs={12} sm={6} key={question._id}>
                <QuestionCard question={question} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Dialog Xác Nhận Xóa */}
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
