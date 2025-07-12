"use client";
import { useState, useEffect } from "react";

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

export const CommentsSection = ({ feedbacks, courseId, onFeedbackUpdated }) => {
  const [localFeedbacks, setLocalFeedbacks] = useState(feedbacks || []);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [apiResponse, setApiResponse] = useState({
    type: "",
    message: "",
  });
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  useEffect(() => {
    setLocalFeedbacks(feedbacks || []);
  }, [feedbacks]);

  useEffect(() => {
    if (apiResponse.message) {
      const timer = setTimeout(() => {
        setApiResponse({ type: "", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [apiResponse.message]);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setApiResponse({
        type: "error",
        message: "Authentication required",
      });
      return null;
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const refreshData = () => {
    onFeedbackUpdated?.();
  };

  const parseResponse = async (response) => {
    try {
      if (response.status === 204) return null; // No content
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      console.error("Error parsing response:", error);
      return null;
    }
  };

  const handleAddFeedback = async (e) => {
    e.preventDefault();
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      const response = await fetch(
        `https://codixa.runasp.net/api/CoursesFeedback/Add/${courseId}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ comment: newComment, rate: newRating }),
        }
      );

      const data = await parseResponse(response);

      if (response.ok) {
        setNewComment("");
        setNewRating(0);
        setApiResponse({
          type: "success",
          message:
            typeof data === "string" ? data : "Feedback added successfully!",
        });
        refreshData();
      } else {
        setApiResponse({
          type: "error",
          message: data?.message || data || "Failed to add feedback",
        });
      }
    } catch (error) {
      console.error("Error adding feedback:", error);
      setApiResponse({
        type: "error",
        message: error.message || "An error occurred while adding feedback",
      });
    }
  };

  const handleUpdateFeedback = async (feedbackId) => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      const response = await fetch(
        `https://codixa.runasp.net/api/CoursesFeedback/Update/${courseId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            id: feedbackId,
            comment: editedComment,
            rate: editedRating,
          }),
        }
      );

      const data = await parseResponse(response);

      if (response.ok) {
        setEditingId(null);
        setApiResponse({
          type: "success",
          message:
            typeof data === "string" ? data : "Feedback updated successfully!",
        });
        refreshData();
      } else {
        setApiResponse({
          type: "error",
          message: data?.message || data || "Failed to update feedback",
        });
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
      setApiResponse({
        type: "error",
        message: error.message || "An error occurred while updating feedback",
      });
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      const response = await fetch(
        `https://codixa.runasp.net/api/CoursesFeedback/Delete/${courseId}`,
        {
          method: "DELETE",
          headers,
          body: JSON.stringify({ id: feedbackId }),
        }
      );

      const data = await parseResponse(response);

      if (response.ok) {
        setApiResponse({
          type: "success",
          message:
            typeof data === "string" ? data : "Feedback deleted successfully!",
        });
        refreshData();
      } else {
        setApiResponse({
          type: "error",
          message: data?.message || data || "Failed to delete feedback",
        });
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setApiResponse({
        type: "error",
        message: error.message || "An error occurred while deleting feedback",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Student Feedback
      </h2>

      {apiResponse.message && (
        <div
          className={`p-4 mb-4 rounded-lg ${
            apiResponse.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {apiResponse.message}
        </div>
      )}

      {hasToken ? (
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
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-gray-500">
          Please login to post feedback
        </div>
      )}

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
                      <span className="ml-2 text-sm text-gray-500">
                        ({feedback.studentRole})
                      </span>
                    </h3>
                    <StarRating averageRating={feedback.rate} />
                  </div>
                  {feedback.userCanDeleteOrUpdate && (
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
                  )}
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
