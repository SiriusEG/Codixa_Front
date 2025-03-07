"use client";
import { StarRating } from "./StarRating";

export const CommentsSection = ({ feedbacks }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Feedback</h2>
    {feedbacks?.length > 0 ? (
      feedbacks.map((feedback, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              {feedback.studentFullName[0]}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {feedback.studentFullName}
              </h3>
              <StarRating averageRating={feedback.rate} />
            </div>
          </div>
          <p className="text-gray-600 pl-[52px]">{feedback.comment}</p>
        </div>
      ))
    ) : (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-gray-500">
        No comments yet. Be the first to share your experience!
      </div>
    )}
  </div>
);
