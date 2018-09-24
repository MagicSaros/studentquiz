package com.matsveyeu.studentquiz;

import com.matsveyeu.studentquiz.entity.Category;
import com.matsveyeu.studentquiz.entity.Question;
import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.enums.UserRole;
import com.matsveyeu.studentquiz.repository.CategoryRepository;
import com.matsveyeu.studentquiz.repository.QuizRepository;
import com.matsveyeu.studentquiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@SpringBootApplication
public class StudentQuizApplication implements CommandLineRunner {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(StudentQuizApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        quizRepository.deleteAll();
        userRepository.deleteAll();

        Category category1 = new Category();
        category1.setName("Java");
        Category category2 = new Category();
        category2.setName("Javascript");
        Category category3 = new Category();
        category3.setName("Python");

        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);

        Question question = new Question();
        question.setText("What is java?");
        Map<String, Boolean> options = new HashMap<>();
        options.put("Programming language", true);
        options.put("Coffee type", false);
        options.put("Drugs", false);
        question.setOptions(options);

        Set<Question> questions = new HashSet<>();
        questions.add(question);

        Quiz quiz = new Quiz();
        quiz.setCategory(category1);
        quiz.setName("Java quiz");
        quiz.setQuestions(questions);

        User teacher = new User.Builder()
                .setFirstName("Dima")
                .setLastName("Gubich")
                .setRole(UserRole.TEACHER)
                .setEmail("zeus_is_back@gmail.com")
                .setLogin("nagibator9k")
                .setPassword("navi_v_finale")
                .build();

        User student = new User.Builder()
                .setFirstName("John")
                .setLastName("Doe")
                .setRole(UserRole.STUDENT)
                .setEmail("john_doe@gmail.com")
                .setLogin("doe")
                .setPassword("doe123")
                .build();

        userRepository.save(teacher);
        userRepository.save(student);

        quizRepository.save(quiz);
    }
}