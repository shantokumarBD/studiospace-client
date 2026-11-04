import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ShadcnPagination className="pt-8 sm:pt-10">
      <PaginationContent className="flex flex-wrap items-center justify-center gap-2">
        <PaginationItem>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-surface-1 border border-border-subtle text-xs font-mono text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer h-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </Button>
        </PaginationItem>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <Button
                type="button"
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(pageNumber)}
                className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNumber
                    ? "bg-gradient-to-r from-brand-orange to-brand-amber text-white shadow-md border-transparent"
                    : "bg-surface-1 border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-2"
                }`}
              >
                {pageNumber}
              </Button>
            </PaginationItem>
          ))}
        </div>

        <PaginationItem>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-surface-1 border border-border-subtle text-xs font-mono text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer h-auto"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}