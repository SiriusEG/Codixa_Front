"use client";
import { useState, useEffect } from "react";

// Updated StarRating component with interactive functionality
const StarRating = ({ averageRating, editable = false, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rating) => {
    if (editable && onRate) {
      onRate(rating);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${
            editable ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
          disabled={!editable}
        >
          <span
            className={
              star <= (hoverRating || averageRating)
                ? "text-yellow-400"
                : "text-gray-300"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export const CommentsSection = ({ feedbacks, courseId }) => {
  const [localFeedbacks, setLocalFeedbacks] = useState(feedbacks || []);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  // Refresh local state when parent feedbacks change
  useEffect(() => {
    setLocalFeedbacks(feedbacks || []);
  }, [feedbacks]);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  });

  const handleAddFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://codixa.runasp.net/api/CoursesFeedback/Add/${courseId}`,
        {
          method: "POST",
          headers: getAuthHeader(),
          body: JSON.stringify({ comment: newComment, rate: newRating }),
        }
      );

      if (response.ok) {
        const newFeedback = await response.json();
        setLocalFeedbacks((prev) => [...prev, newFeedback]);
        setNewComment("");
        setNewRating(0);
      }
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const handleUpdateFeedback = async (feedbackId) => {
    try {
      const response = await fetch(
        `https://codixa.runasp.net/api/CoursesFeedback/Update/${courseId}`,
        {
          method: "PUT",
          headers: getAuthHeader(),
          body: JSON.stringify({
            id: feedbackId,
            comment: editedComment,
            rate: editedRating,
          }),
        }
      );

      if (response.ok) {
        setLocalFeedbacks((prev) =>
          prev.map((fb) =>
            fb.id === feedbackId
              ? { ...fb, comment: editedComment, rate: editedRating }
              : fb
          )
        );
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const response = await fetch(
        `https://codixa.runasp.net/api/CoursesFeedback/Delete/${courseId}`,
        {
          method: "DELETE",
          headers: getAuthHeader(),
          body: JSON.stringify({ id: feedbackId }),
        }
      );

      if (response.ok) {
        setLocalFeedbacks((prev) => prev.filter((fb) => fb.id !== feedbackId));
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Student Feedback
      </h2>

      {/* Add Feedback Form */}
      <form
        onSubmit={handleAddFeedback}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
      >
        <h3 className="font-semibold mb-4">Add Your Feedback</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Write your feedback..."
          required
        />
        <div className="flex items-center gap-4">
          <StarRating
            averageRating={newRating}
            onRate={setNewRating}
            editable={true}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Feedback List */}
      {localFeedbacks.length > 0 ? (
        localFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {feedback.studentFullName[0]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {feedback.studentFullName}
                    </h3>
                    <StarRating averageRating={feedback.rate} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(feedback.id);
                        setEditedComment(feedback.comment);
                        setEditedRating(feedback.rate);
                      }}
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFeedback(feedback.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {editingId === feedback.id ? (
              <div className="pl-[52px]">
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  className="w-full p-2 mb-2 border rounded"
                />
                <div className="flex items-center gap-4">
                  <StarRating
                    averageRating={editedRating}
                    onRate={setEditedRating}
                    editable={true}
                  />
                  <button
                    onClick={() => handleUpdateFeedback(feedback.id)}
                    className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 pl-[52px]">{feedback.comment}</p>
            )}
          </div>
        ))
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-gray-500">
          No comments yet. Be the first to share your experience!
        </div>
      )}
    </div>
  );
};
