export function entriesToMarkdown(enteries, type) {
    if (!enteries?.length) return "";

    return(
        `## ${type}\n\n` +
        enteries
            .map((entry) => {
                const dataRange = entry.current
                    ? `${entry.startDate} - Present`
                    : `${entry.startDate} - ${entry.endDate}`;
                return `### ${entry.title} @ ${entry.organization}\n${dataRange}\n\n${entry.description}`;
            })
            .join("\n\n")
    );
}