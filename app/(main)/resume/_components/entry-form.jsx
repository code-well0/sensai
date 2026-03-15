"use client";

import { improveWithAI } from '@/actions/resume';
import { experienceSchema, educationSchema, projectSchema } from '@/app/lib/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Description } from '@radix-ui/react-dialog';
import { format, isValid, parse, set } from 'date-fns';
import { Loader2, PlusCircle, Sparkle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const formatDiaplayDate = (dateString) => {
    if (!dateString) return "";
    const date = parse(dateString, "yyyy-MM", new Date());
    if (!isValid(date)) return "";
    return format(date, "MMM yyyy");
};

const EntryForm = ({ type, entries, onChange }) => {
    const [isAdding, setIsAdding] = useState(false);

    const schemaMap = {
        Experience: experienceSchema,
        Education: educationSchema,
        Project: projectSchema,
    };

    const {
        register,
        handleSubmit: handleValidation,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm({
        resolver: zodResolver(schemaMap[type]),
        defaultValues:
            type === "Experience"
                ? {
                    title: "",
                    organization: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    current: false,
                }
                : type === "Education"
                    ? {
                        degree: "",
                        institution: "",
                        startDate: "",
                        endDate: "",
                        cgpa: "",
                        description: "",
                    }
                    : {
                        name: "",
                        techStack: "",
                        link: "",
                        description: "",
                    },
    });

    const current = watch("current");

    const {
        loading: isImproving,
        fn: improveWithAIFn,
        data: improvedContent,
        error: improveError,
    } = useFetch(improveWithAI);

    const handleAdd = handleValidation((data) => {
        const formattedEntry = {
            ...data,
            startDate: formatDiaplayDate(data.startDate),
            endDate: data.current ? "" : formatDiaplayDate(data.endDate),
        };

        onChange([...entries, formattedEntry]);
        reset();
        setIsAdding(false);
    });

    const handleDelete = (index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        onChange(newEntries);
    };

    useEffect(() => {
        if (improvedContent && !isImproving) {
            setValue("description", improvedContent);
            toast.success("Description improved successfully!");
        }

        if (improveError) {
            toast.error(improveError.message || "Failed to improve description");
        }
    }, [improvedContent, improveError, isImproving]);

    const handleImproveDescription = async () => {
        const description = watch("description");
        if (!description) {
            toast.error("Please enter a description first");
            return;
        }

        await improveWithAIFn({
            current: description,
            type: type.toLowerCase(), // 'Experience', 'Education' or 'Project   
        })
    };

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {entries.map((item, index) => {
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-cemter justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {type === "Experience" && `${item.title} @ ${item.organization}`}
                                    {type === "Education" && `${item.degree} - ${item.institution}`}
                                    {type === "Project" && `${item.name}`}
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    type="button"
                                    onClick={() => handleDelete(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {item.current
                                        ? `${item.startDate} - Present`
                                        : `${item.startDate} - ${item.endDate}`}
                                </p>
                                <p className="mt-2 text-sm whitespaces-pre-wrap">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {isAdding && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add {type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {type === "Experience" && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Title/Position"
                                            {...register("title")}
                                            error={errors.title}
                                        />
                                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Organization/Company"
                                            {...register("organization")}
                                            error={errors.organization}
                                        />
                                        {errors.organization && <p className="text-sm text-red-500">{errors.organization.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Input
                                            type="month"
                                            {...register("startDate")}
                                            error={errors.startDate}
                                        />
                                        {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            type="month"
                                            {...register("endDate")}
                                            disabled={current}
                                            error={errors.endDate}
                                        />
                                        {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Input
                                        type="checkbox"
                                        id="current"
                                        {...register("current")}
                                        onChange={(e) => {
                                            setValue("current", e.target.checked);
                                            if (e.target.checked) {
                                                setValue("endDate", "");
                                            }
                                        }}
                                    />
                                    <label htmlFor="current">Current {type}</label>
                                </div>
                            </>
                        )}

                        {type === "Education" && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Degree"
                                            {...register("degree")}
                                            error={errors.degree}
                                        />
                                        {errors.degree && <p className="text-sm text-red-500">{errors.degree.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Institution"
                                            {...register("institution")}
                                            error={errors.institution}
                                        />
                                        {errors.institution && <p className="text-sm text-red-500">{errors.institution.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Input
                                            type="month"
                                            {...register("startDate")}
                                            error={errors.startDate}
                                        />
                                        {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            type="month"
                                            {...register("endDate")}
                                            error={errors.endDate}
                                        />
                                        {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        placeholder="CGPA"
                                        {...register("cgpa")}
                                        error={errors.cgpa}
                                    />
                                    {errors.cgpa && <p className="text-sm text-red-500">{errors.cgpa.message}</p>}
                                </div>
                            </>
                        )}

                        {type === "Project" && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Project Name"
                                            {...register("name")}
                                            error={errors.name}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Tech Stack"
                                            {...register("techStack")}
                                            error={errors.techStack}
                                        />
                                        {errors.techStack && <p className="text-sm text-red-500">{errors.techStack.message}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Link"
                                        {...register("link")}
                                        error={errors.link}
                                    />
                                    {errors.link && <p className="text-sm text-red-500">{errors.link.message}</p>}
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <Textarea
                                placeholder={`Description of your ${type.toLowerCase()}`}
                                className="h-32"
                                {...register("description")}
                                error={errors.description}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleImproveDescription}
                            disabled={isImproving || !watch("description")}
                        >
                            {isImproving ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Improving...
                                </>
                            ) : (
                                <>
                                    <Sparkle className="h-4 w-4 mr-2" />
                                    Improve with AI
                                </>
                            )}
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                reset();
                                setIsAdding(false)
                            }}
                        >
                            Cancel
                        </Button>

                        <Button type="button" onClick={handleAdd}>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Entry
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {!isAdding && (
                <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setIsAdding(true)}
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add {type}
                </Button>
            )}
        </div>
    )
}

export default EntryForm;