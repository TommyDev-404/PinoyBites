import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
      Card,
      CardHeader,
      CardTitle,
      CardDescription,
      CardContent,
} from "@/components/ui/card";

import {
      Table,
      TableHeader,
      TableRow,
      TableHead,
      TableBody,
      TableCell,
} from "@/components/ui/table";
import {
      Eye,
      MessageSquare,
      Star
} from "lucide-react";

import FeedbackDetailsModal from "./ViewFeedback";
import ReplyFeedbackModal from "./ReplyFeedback";
import { useAdminGetFeedback, useAdminToggleFeaturedReview } from "@/hooks/admin/feedback.hooks";
import type { FeedbackFilter, FeedbackSort } from "@/types/user/feedback.types";

type ModalType = "view" | "reply" | "delete" | null;

export default function FeedbackTable() {
      const [modal, setModal] = useState<ModalType>(null);
      const [feedbackId, setFeedbackId] = useState<number>(0);

      const [sortBy, setSortBy] = useState<FeedbackSort>("best");
      const [filter, setFilter] = useState<FeedbackFilter>("all");
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 8;

      const { mutate: toggleFeatured } = useAdminToggleFeaturedReview();
      const { data: feedbackData } = useAdminGetFeedback(filter, sortBy);
      const feedbacks = feedbackData?.feedbacks ?? [];
      
      const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

      const paginatedFeedbacks = feedbacks.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
      );
      
      const openModal = (type: ModalType, id: number) => {
            setModal(type);
            setFeedbackId(id);
      };

      const handleMarkedAsFeatured = (review_id: number) => {
            toggleFeatured({ review_id });
      };

      return (
            <Card>
                  <CardHeader>
                        <CardTitle>Feedback Management</CardTitle>
                        <CardDescription>
                              Moderate feedback and select testimonials for marketing
                        </CardDescription>
                  </CardHeader>

                  <CardContent>
                        {/* FILTER BAR */}
                        <div className="flex justify-between mb-4">
                              <div className="flex gap-2 flex-wrap">
                                    <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                                          All
                                    </Button>
                                    <Button variant={filter === "system" ? "default" : "outline"} onClick={() => setFilter("system")}>
                                          System
                                    </Button>
                                    <Button variant={filter === "product" ? "default" : "outline"} onClick={() => setFilter("product")}>
                                          Product
                                    </Button>
                              </div>

                              <select
                                    className="border rounded px-2 text-sm"
                                    value={sortBy}
                                    onChange={(e) =>
                                          setSortBy(e.target.value as FeedbackSort)
                                    }
                              >
                                    <option value="best">Best</option>
                                    <option value="rating">Rating</option>
                                    <option value="newest">Newest</option>
                              </select>
                        </div>

                        {/* TABLE */}
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="text-center">User</TableHead>
                                          <TableHead className="text-center">Rating</TableHead>
                                          <TableHead className="text-center">Comment</TableHead>
                                          <TableHead className="text-center">Status</TableHead>
                                          <TableHead className="text-center">Category</TableHead>
                                          <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                              </TableHeader>

                              <TableBody className="text-center">
                                    {paginatedFeedbacks.length === 0 ? (
                                          <TableRow>
                                                <TableCell colSpan={6} className="py-10">
                                                      <div className="flex flex-col items-center justify-center text-gray-500">
                                                            <MessageSquare size={40} className="mb-3 text-gray-300" />

                                                            <p className="text-sm font-medium">No reviews yet</p>
                                                            <p className="text-xs text-gray-400">
                                                                  Feedback will appear here once users submit reviews.
                                                            </p>
                                                      </div>
                                                </TableCell>
                                          </TableRow>
                                    ) : (paginatedFeedbacks.map((fb) => (
                                          <TableRow key={fb.review_id}>
                                                {/* USER */}
                                                <TableCell className="font-medium">
                                                      {fb.username}
                                                </TableCell>

                                                {/* RATING */}
                                                <TableCell>
                                                      <div className="flex items-center justify-center gap-1">
                                                            <Star size={14} className="text-yellow-500" />
                                                            {fb.rating}
                                                      </div>
                                                </TableCell>

                                                {/* COMMENT */}
                                                <TableCell className="max-w-[250px] truncate">
                                                      {fb.comment}
                                                </TableCell>

                                                {/* STATUS */}
                                                <TableCell>
                                                      {fb.status === "Good" ? (
                                                            <span className="text-green-600 font-semibold">
                                                                  Good
                                                            </span>
                                                      ) : fb.status === "Bad" ? (
                                                            <span className="text-red-600 font-semibold">
                                                                  Bad
                                                            </span>
                                                      ) : (
                                                            <span className="text-gray-500 font-semibold">
                                                                  Neutral
                                                            </span>
                                                      )}
                                                </TableCell>

                                                {/* CATEGORY */}
                                                <TableCell>
                                                      {fb.category}
                                                </TableCell>

                                                {/* ACTIONS */}
                                                <TableCell>
                                                      <div className="flex justify-center items-center gap-2">
                                                      
                                                            {/* REPLY */}
                                                            {!fb.is_replied &&
                                                                  <Button
                                                                        size="icon"
                                                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                                                        onClick={() =>
                                                                              openModal("reply", fb.review_id)
                                                                        }
                                                                  >
                                                                        <MessageSquare size={16} />
                                                                  </Button>
                                                            }

                                                            {/* FEATURE TOGGLE (STAR ICON) */}
                                                            <Button
                                                                  size="icon"
                                                                  variant="ghost"
                                                                  onClick={() => handleMarkedAsFeatured(fb.review_id)}
                                                            >
                                                                  {fb.is_featured_review ? (
                                                                        <Star className="text-yellow-500 fill-yellow-500" size={18} />
                                                                  ) : (
                                                                        <Star className="text-gray-400" size={18} />
                                                                  )}
                                                            </Button>
                                                            
                                                            {/* VIEW */}
                                                            <Button
                                                                  variant="ghost"
                                                                  size="icon"
                                                                  onClick={() =>
                                                                        openModal("view", fb.review_id)
                                                                  }
                                                            >
                                                                  <Eye size={16} />
                                                            </Button>
                                                      </div>
                                                </TableCell>
                                          </TableRow>
                                    )))}
                              </TableBody>
                        </Table>

                        <div className="flex items-center justify-between mt-4">
                              <p className="text-sm text-gray-500">
                                    Page {currentPage} of {totalPages || 1}
                              </p>

                              <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                          <Button
                                                key={i}
                                                variant={currentPage === i + 1 ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentPage(i + 1)}
                                          >
                                          {i + 1}
                                          </Button>
                                    ))}
                              </div>

                              <div className="flex items-center gap-2">
                                    <Button
                                          variant="outline"
                                          size="sm"
                                          disabled={currentPage === 1}
                                          onClick={() => setCurrentPage((prev) => prev - 1)}
                                    >
                                          Prev
                                    </Button>

                                    <Button
                                          variant="outline"
                                          size="sm"
                                          disabled={currentPage === totalPages}
                                          onClick={() => setCurrentPage((prev) => prev + 1)}
                                    >
                                          Next
                                    </Button>
                              </div>
                        </div>
                  </CardContent>


                  {/* MODALS */}
                  {modal === "view" && (
                        <FeedbackDetailsModal
                              feedback={feedbacks.find((f) => f.review_id === feedbackId)!}
                              open={true}
                              onClose={() => setModal(null)}
                        />
                  )}

                  {modal === "reply" && (
                        <ReplyFeedbackModal
                              feedbackId={feedbackId}
                              open={true}
                              onClose={() => setModal(null)}
                        />
                  )}
            </Card>
      );
}